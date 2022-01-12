'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('book', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      amountPages: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: false
      },
      authorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'author',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, {
      schema: 'public'
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
