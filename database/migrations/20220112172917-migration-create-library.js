'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('library', {
      accountId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'account',
            schema: 'public',
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      bookId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'book',
            schema: 'public',
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      status: {
        type: Sequelize.DataTypes.ENUM('STATUS_WANT_TO_READ', 'STATUS_IN_PROGRESS', 'STATUS_FINISHED'),
        defaultValue: 'STATUS_WANT_TO_READ'
      },
      bookmarkPage: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
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
    })
      .then(() => {
        return queryInterface.addConstraint('library',  {
          type: 'primary key',
          fields: ['accountId', 'bookId'],
          name: 'account_book_pkey'
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
