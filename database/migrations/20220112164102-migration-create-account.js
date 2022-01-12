'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('account', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      activationLink: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isActivated: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: Sequelize.DataTypes.ENUM('ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'),
        defaultValue: 'ROLE_USER'
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
