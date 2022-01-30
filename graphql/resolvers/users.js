const { UserInputError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');
const { JWT_SECRET } = require('../../config/env.json')
const { User, Message } = require('../../models');

module.exports = {
  Query: {
    getUsers: async (_, __, { user: userObj }) => {
      try {
        if (!userObj) {
          throw new AuthenticationError('token authentication failed')
        }
        let usersList = await User.findAll({
          attributes: ['username', 'imageUrl', 'createdAt'],
          where: {
            username: {
              [Op.ne]: userObj.username // !== user
            }
          }
        })
        const allUserMessageList = await Message.findAll({
          where: {
            [Op.or]: [
              { from: userObj.username },
              { to: userObj.username },
            ]
          },
          order: [['createdAt', 'DESC']]
        })
        // add message on user
        usersList = usersList.map((userInfo) => {
          const { username } = userInfo
          const latestMessage = allUserMessageList.find(({ from, to }) => {
            return from === username || to === username
          })
          userInfo.latestMessage = latestMessage
          return userInfo
        })

        return usersList
      } catch (err) {
        console.log('getUsers err', err);
        throw err
      }
    },
    login: async (_, args) => {
      const { username, password } = args
      const error = {}
      try {
        const user = await User.findOne({
          where: { username }
        })
        if (!user) {
          error.username = 'user not found'
          throw new UserInputError('user not found', { error })
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
          error.password = 'password is incorrect'
          throw new AuthenticationError('password is incorrect', { error })
        }
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 })
        // const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
        return {
          ...user.toJSON(),
          token,
          createdAt: user.createdAt.toISOString()
          // createdAt: user.createdAt.replace(pattern, '$1-$2-$3 $4:$5:$6')
        }
      } catch (err) {
        console.log('login err', err)
        throw err
      }
    }
  },
  Mutation: {
    register: async (__, args) => {
      let { username, email, password, confirmPassword } = args
      const error = {}
      try {
        // Use serialize to check the validity of the input value
        if (password !== confirmPassword) {
          error.confirmPassword = 'password must match'
          throw error
        }
        // Because the type constraint of the field is made by sequencing, 
        // it is verified whether the user information already exists in dB
        // hash password
        password = await bcrypt.hash(password, 10)
        const user = await User.create({
          username, email, password
        })
        return user
      } catch (err) {
        console.log('register err', err);
        // throw err to graphql
        const { name: errName, errors } = err
        if (errName === 'SequelizeValidationError') { // validate
          errors.forEach(({ path, message }) => (error[path] = message));
        } else if (errName === 'SequelizeUniqueConstraintError') { // unique
          errors.forEach(({ path, message }) => (error[path] = `${path} already exists`));
        }
        throw new UserInputError('err input', { error })
      }
    }
  }
}