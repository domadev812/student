import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Course from './Course';
import Grade from './Grade';
import Student from './Student';

@Table({
  tableName: 'studentCourseGrades',
  name: {
    singular: 'studentCourseGrade',
    plural: 'studentCourseGrades',
  },
})
export default class StudentCourseGrade extends Model {
  // #region Columns

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER.UNSIGNED)
  studentId!: number;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Course)
  @Column(DataType.INTEGER.UNSIGNED)
  courseId!: number;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Grade)
  @Column(DataType.INTEGER.UNSIGNED)
  gradeId!: number;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  createdAt!: Date;

  // #endregion

  // #region Associations
  @BelongsTo(() => Student)
  student!: Student;

  getStudent!: () => Promise<Student>;

  @BelongsTo(() => Course)
  course!: Course;

  getCourse!: () => Promise<Course>;

  @BelongsTo(() => Grade)
  grade!: Grade;

  getGrade!: () => Promise<Grade>;

  // #endregion
}
