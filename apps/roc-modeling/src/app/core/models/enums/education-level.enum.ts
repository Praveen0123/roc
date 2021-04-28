import { Enumeration } from '@vantage-point/ddd-core';
import { orderBy } from 'lodash';

export class EducationLevelEnum extends Enumeration
{
  public static Instances: EducationLevelEnum[] = [];
  public static readonly NinthGradeStudent = new EducationLevelEnum(-4, '9th Grade', 0);
  public static readonly TenthGradeStudent = new EducationLevelEnum(-3, '10th Grade', 1);
  public static readonly EleventhGradeStudent = new EducationLevelEnum(-2, '11th Grade', 2);
  public static readonly TwelfthDegreeStudent = new EducationLevelEnum(-1, '12th Grade', 3);
  public static readonly HighSchoolGraduate = new EducationLevelEnum(0, 'High School Graduate', 4);
  public static readonly AssociatesDegree = new EducationLevelEnum(1, "Associate's Degree", 5);
  public static readonly BachelorsDegree = new EducationLevelEnum(2, "Bachelor's Degree", 6);
  public static readonly MastersDegree = new EducationLevelEnum(3, "Master's Degree", 7);
  public static readonly DoctorateDegree = new EducationLevelEnum(4, "Doctorate Degree", 8);

  private ordinal: number;

  private constructor
    (
      value: number,
      displayName: string,
      ordinal: number
    )
  {
    super(value, displayName);

    this.ordinal = ordinal;

    EducationLevelEnum.Instances.push(this);
  }

  static fromValue(value: number): EducationLevelEnum
  {
    try
    {
      if (EducationLevelEnum.Instances)
      {
        const instance = EducationLevelEnum.Instances.filter((item: Enumeration) => item.value === value);

        if (instance != null && instance.length === 1)
        {
          console.log('enum ordinal', instance[0].ordinal);
          return instance[0];
        }
      }

      return EducationLevelEnum.HighSchoolGraduate;
    }
    catch (error)
    {
      return EducationLevelEnum.HighSchoolGraduate;
    }
  }

  static fromDisplayName(displayName: string): EducationLevelEnum
  {
    try
    {
      if (EducationLevelEnum.Instances)
      {
        const instance = EducationLevelEnum.Instances.filter((item: Enumeration) => item.displayName === displayName);

        if (instance != null && instance.length === 1)
        {
          return instance[0];
        }
      }

      return EducationLevelEnum.HighSchoolGraduate;
    }
    catch (error)
    {
      return EducationLevelEnum.HighSchoolGraduate;
    }
  }

  static getCurrentEducationLevelOptions(): EducationLevelEnum[]
  {
    try
    {
      if (EducationLevelEnum.Instances)
      {
        const instances = EducationLevelEnum.Instances.filter((item: Enumeration) => item.value <= 0);

        return orderBy(instances, ['ordinal'], ['asc']);
      }

      return [EducationLevelEnum.HighSchoolGraduate];
    }
    catch (error)
    {
      return [EducationLevelEnum.HighSchoolGraduate];
    }
  }

  static getEducationLevelGoalOptions(): EducationLevelEnum[]
  {
    try
    {
      if (EducationLevelEnum.Instances)
      {
        const instances = EducationLevelEnum.Instances.filter((item: Enumeration) => item.value >= 0);

        return orderBy(instances, ['ordinal'], ['asc']);
      }

      return [EducationLevelEnum.HighSchoolGraduate];
    }
    catch (error)
    {
      return [EducationLevelEnum.HighSchoolGraduate];
    }
  }
}
