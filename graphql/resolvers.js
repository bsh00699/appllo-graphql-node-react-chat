const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const { User } = require('../models');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const usersList = await User.findAll()
        return usersList
      } catch (err) {
        console.log('getUsers err', err);
        throw err
      }
    },
  },
  Mutation: {
    register: async (__, args) => {
      let { username, email, password, confirmPassword } = args
      const error = {}
      try {
        // 利用sequelize做输入值有效性check
        if (password !== confirmPassword) {
          error.confirmPassword = 'password must match'
          throw error
        }
        // 由于利用sequelize做了字段的类型约束，校验用户信息是否在db中已经存在
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