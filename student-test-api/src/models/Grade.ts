import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import StudentCourseGrade from './StudentCourseGrade';

@Table({
  tableName: 'grades',
  name: {
    singular: 'grade',
    plural: 'grades',
  },
})
export default class Grade extends Model {
  // #region Columns

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(1))
  letter!: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  score!: number;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  createdAt!: Date;

  // #endregion

  // #region Associations

  @HasMany(() => StudentCourseGrade)
  studentCourseGrades!: StudentCourseGrade[];

  // #endregion
}
