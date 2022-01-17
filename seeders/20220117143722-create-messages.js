'use strict';

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
    return queryInterface.bulkInsert('messages', [
      {
        uuid: '7648485a-6657-48d7-87d6-6a98931d3598',
        content: 'Hey lina!',
        from: 'xingchao',
        to: 'lina',
        createdAt: '2022-01-17 07:00:00',
        updatedAt: '2022-01-17 07:00:00',
      },
      {
        uuid: 'ae4df4f1-a428-400d-bb16-edd4237e0c47',
        content: "Hey , xingchao 怎么了",
        from: 'lina',
        to: 'xingchao',
        createdAt: '2022-01-17 08:00:00',
        updatedAt: '2022-01-17 08:00:00',
      },
      {
        uuid: '0a7c92ac-f69c-4799-8aad-9663a4afb47d',
        content: '刚吃完饭，你吃饭了吗',
        from: 'xingchao',
        to: 'lina',
        createdAt: '2022-01-17 09:00:00',
        updatedAt: '2022-01-17 09:00:00',
      },
      {
        uuid: '240dd560-5825-4d5d-b089-12a67e8ec84c',
        content: "我还在加班，没时间吃呢",
        from: 'lina',
        to: 'xingchao',
        createdAt: '2022-01-17 10:00:00',
        updatedAt: '2022-01-17 10:00:00',
      },
      {
        uuid: '60909592-cfd7-4b16-a1ce-709091d5f6d7',
        content: "好吧，记得吃饭",
        from: 'xingchao',
        to: 'lina',
        createdAt: '2022-01-17 11:00:00',
        updatedAt: '2022-01-17 11:00:00',
      },
      {
        uuid: 'a10ad37d-c70b-4093-ae33-e5d0ab9498e1',
        content: '好的',
        from: 'lina',
        to: 'xingchao',
        createdAt: '2022-01-17 12:00:00',
        updatedAt: '2022-01-17 12:00:00',
      },
      {
        uuid: 'be49ab98-5271-4eb9-a630-dd6d37e420ed',
        content: '下班后，一起去商店，买点水果？',
        from: 'xingchao',
        to: 'lina',
        createdAt: '2022-01-17 13:00:00',
        updatedAt: '2022-01-17 13:00:00',
      },
      {
        uuid: 'a10ad37d-c70b-4093-ae33-e5d0ab9429e4',
        content: "好的，下班后，我通知你",
        from: 'lina',
        to: 'xingchao',
        createdAt: '2022-01-17 14:00:00',
        updatedAt: '2022-01-17 14:00:00',
      },
      {
        uuid: 'be49ab98-5271-4eb9-a630-dd6d37e623j7',
        content: '好的',
        from: 'xingchao',
        to: 'lina',
        createdAt: '2022-01-17 15:00:00',
        updatedAt: '2022-01-17 15:00:00',
      },
      {
        uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd863',
        content: 'Hey xingchao, 最近工作怎么样？',
        from: 'pan',
        to: 'xingchao',
        createdAt: '2022-01-17 11:00:00',
        updatedAt: '2022-01-17 11:00:00',
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
    return queryInterface.bulkDelete('messages', null, {})
  }
};
