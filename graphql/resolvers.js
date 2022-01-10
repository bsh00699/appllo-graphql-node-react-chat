const { User } = require('../models');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const usersList = await User.findAll()
        return usersList
      } catch (err) {
        console.log(err);
      }
    },
  },
}