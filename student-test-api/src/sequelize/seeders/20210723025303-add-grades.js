module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('grades', [{
      id: 1,
      letter: 'A',
      score: 4,
    }, {
      id: 2,
      letter: 'B',
      score: 3,
    }, {
      id: 3,
      letter: 'C',
      score: 2,
    }, {
      id: 4,
      letter: 'D',
      score: 1,
    }, {
      id: 5,
      letter: 'E',
      score: 0,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('grades');
  },
};
