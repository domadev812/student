module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'studentCourseGrades', {
        studentId: {
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
        },
        courseId: {
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
        },
        gradeId: {
          primaryKey: true,
          type: Sequelize.INTEGER(11).UNSIGNED,
          allowNull: false,
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

    await queryInterface.addConstraint('studentCourseGrades', {
      type: 'foreign key',
      fields: ['studentId'],
      name: 'studentCourseGradeStudentId',
      references: {
        table: 'students',
        field: 'id',
      },
    }, { logging: console.log });

    await queryInterface.addConstraint('studentCourseGrades', {
      type: 'foreign key',
      fields: ['courseId'],
      name: 'studentCourseGradeCourseId',
      references: {
        table: 'courses',
        field: 'id',
      },
    }, { logging: console.log });

    await queryInterface.addConstraint('studentCourseGrades', {
      type: 'foreign key',
      fields: ['gradeId'],
      name: 'studentCourseGradeGradeId',
      references: {
        table: 'grades',
        field: 'id',
      },
    }, { logging: console.log });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('studentCourseGrades'),
};
