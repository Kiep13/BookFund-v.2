'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('genre', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      parentGenreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'genre',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    }, {
      schema: 'public'
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
