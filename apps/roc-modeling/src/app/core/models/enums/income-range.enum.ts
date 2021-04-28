import { Enumeration } from '@vantage-point/ddd-core';
import { orderBy } from 'lodash';

export class IncomeRangeEnum extends Enumeration
{
  public static Instances: IncomeRangeEnum[] = [];
  public static readonly UNKNOWN = new IncomeRangeEnum(0, 'Unknown', 'UNKNOWN', 0);
  public static readonly From_0_To_30000 = new IncomeRangeEnum(1, '0 - $29K', 'From_0_To_30000', 1);
  public static readonly From_30001_To_48000 = new IncomeRangeEnum(2, '$30K - $47K', 'From_30001_To_48000', 2);
  public static readonly From_48001_To_75000 = new IncomeRangeEnum(3, '$48K - $74K', 'From_48001_To_75000', 3);
  public static readonly From_75001_To_110000 = new IncomeRangeEnum(4, '$75K - $109K', 'From_75001_To_110000', 4);
  public static readonly From_110001_Or_More = new IncomeRangeEnum(5, "$110K or More", 'From_110001_Or_More', 5);

  private key: string;
  private ordinal: number;

  private constructor
    (
      value: number,
      displayName: string,
      key: string,
      ordinal: number
    )
  {
    super(value, displayName);

    this.key = key;
    this.ordinal = ordinal;

    IncomeRangeEnum.Instances.push(this);
  }

  static fromValue(value: number): IncomeRangeEnum
  {
    try
    {
      if (IncomeRangeEnum.Instances)
      {
        const instance = IncomeRangeEnum.Instances.filter((item: Enumeration) => item.value === value);

        if (instance != null && instance.length === 1)
        {
          console.log('enum ordinal', instance[0].ordinal);
          console.log('enum key', instance[0].key);
          return instance[0];
        }
      }

      return IncomeRangeEnum.UNKNOWN;
    }
    catch (error)
    {
      return IncomeRangeEnum.UNKNOWN;
    }
  }

  static fromDisplayName(displayName: string): IncomeRangeEnum
  {
    try
    {
      if (IncomeRangeEnum.Instances)
      {
        const instance = IncomeRangeEnum.Instances.filter((item: Enumeration) => item.displayName === displayName);

        if (instance != null && instance.length === 1)
        {
          return instance[0];
        }
      }

      return IncomeRangeEnum.UNKNOWN;
    }
    catch (error)
    {
      return IncomeRangeEnum.UNKNOWN;
    }
  }

  static getOrderedList(): IncomeRangeEnum[]
  {
    try
    {
      if (IncomeRangeEnum.Instances)
      {
        return orderBy(IncomeRangeEnum.Instances, ['ordinal'], ['asc']);
      }

      return [IncomeRangeEnum.UNKNOWN];
    }
    catch (error)
    {
      return [IncomeRangeEnum.UNKNOWN];
    }
  }
}
