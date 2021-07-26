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
  tableName: 'courses',
  name: {
    singular: 'course',
    plural: 'courses',
  },
})
export default class Course extends Model {
  // #region Columns

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name!: string;

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
