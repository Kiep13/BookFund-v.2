'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('book', ['authorId'], {
      name: 'book_author_id'
    })
  },

  down: async (queryInterface, Sequelize) => {
  }
};
