'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('session', {
      sid: {
        type: Sequelize.STRING,
        primaryKey: tru
      },
      sess: {
        type: Sequelize.JSON
      },
      expire: {
        allowNull: false,
        type: 'TIMESTAMP'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('session');
  }
};
