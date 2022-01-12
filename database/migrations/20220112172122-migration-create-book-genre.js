'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('book_genre', {
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
      genreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'genre',
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
    })
      .then(() => {
        return queryInterface.addConstraint('book_genre',  {
          type: 'primary key',
          fields: ['bookId', 'genreId'],
          name: 'book_genre_pkey'
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
