'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Tasks', [
        {id:1, description:'Primera inserción', createdAt: new Date(), updatedAt:new Date()},
        {id:2, description:'Terminar Curso de Backend', createdAt: new Date(), updatedAt:new Date()},
        {id:3, description:'Trabajar en Curso de Git', createdAt: new Date(), updatedAt:new Date()}
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Tasks', null, {});

  }
};
