const { UserInputError, AuthenticationError, withFilter } = require('apollo-server')
const { Op } = require('sequelize');
const { Message, User } = require('../../models');

module.exports = {
  Query: {
    getMessage: async (_, args, { user }) => {
      const { from } = args
      try {
        if (!user) throw new AuthenticationError('token authentication failed')
        const fromUser = await User.findOne({
          where: {
            username: from
          }
        })
        if (!fromUser) throw new AuthenticationError('user not found')

        const usernames = [user.username, fromUser.username]
        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames }
          },
          order: [['createdAt', 'DESC']]
        })
        return messages
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    sendMessage: async (_, args, { user, pubsub }) => {
      const { to, content } = args
      try {
        if (!user) throw new AuthenticationError('token authentication failed')
        const recipient = await User.findOne({
          where: { username: to }
        })

        if (!recipient) throw new UserInputError('user not found')
        if (recipient.username === user.username) {
          throw new UserInputError('you cant message yourself')
        }

        const message = await Message.create({
          from: user.username,
          to,
          content
        })
        pubsub.publish('NEW_MESSAGE', {
          newMessage: message
        })
        return message
      } catch (err) {
        throw err
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { user, pubsub }) => {
          if (!user) throw new AuthenticationError('token authentication failed')
          return pubsub.asyncIterator(['NEW_MESSAGE'])
        },
        (parent, _, { user }) => {
          // only sender and receiver can receive
          const { newMessage } = parent
          const { username } = user
          if (newMessage.from === username || newMessage.to === username) return true
          return false
        }
      )
    }
  }
}