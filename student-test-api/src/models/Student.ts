import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import StudentCourseGrade from './StudentCourseGrade';

@Table({
  tableName: 'students',
  name: {
    singular: 'student',
    plural: 'studnents',
  },
})
export default class Student extends Model {
  // #region Columns

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  lastName!: string;

  @AllowNull(true)
  @Column(DataType.STRING(50))
  email!: string;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.VIRTUAL)
  get gpa() {
    if (!this.studentCourseGrades) {
      return 0;
    }

    return (
      this.studentCourseGrades.reduce(
        (total, current) => total + (current.grade?.score || 0), 0,
      ) / this.studentCourseGrades.length
    );
  }

  // #endregion

  // #region Associations

  @HasMany(() => StudentCourseGrade)
  studentCourseGrades!: StudentCourseGrade[];

  // #endregion

  // #region Getters
  // #endregion
}
