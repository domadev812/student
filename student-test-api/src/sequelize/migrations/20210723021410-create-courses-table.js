module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'courses', {
        id: {
          type: Sequelize.INTEGER(11).UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      }, {
        engine: 'InnoDB',
        charset: 'utf8',
      },
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('courses'),
};
