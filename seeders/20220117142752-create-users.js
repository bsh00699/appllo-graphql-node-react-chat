'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const password = await bcrypt.hash('123456', 10)
    const createdAt = new Date()
    const updatedAt = createdAt
    await queryInterface.bulkInsert('users', [
      {
        username: 'xingchao',
        email: 'xingchao@email.com',
        password: password,
        imageUrl: 'http://localhost:4000/xingchao.png',
        createdAt,
        updatedAt,
      },
      {
        username: 'lina',
        email: 'lina@email.com',
        password: password,
        imageUrl: 'http://localhost:4000/lina.png',
        createdAt,
        updatedAt,
      },
      {
        username: 'pan',
        email: 'pan@email.com',
        password: password,
        imageUrl: 'http://localhost:4000/jielun.jpeg',
        createdAt,
        updatedAt,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
