/**
 * Interface for the 'Institutions' data
 */
export interface InstitutionsEntity {
  unitId: number;
  opeId: string;
  name: string;
  city: string;
  stateAbbr: string;
  zipCode: string;
  url: string;
  levelTypeId: number;
  levelTypeName: string;
  controlTypeId: number;
  controlTypeName: string;
  avgNetPriceWithGrantScholarshipAid: number;
  gr150Default: number;
}

export interface InstitutionProgram {
  unitId: number;
  cipCode: string;
  ipedsEducationLevelOfferings: IpedsEducationLevelOfferings[];
}

export class IpedsEducationLevelOfferings {
  static readonly ipedsToEmsiEducationLevelMapping: {
    [ipedsEducationLevel: number]: number;
  } = {
    [1]: 1,
    [2]: 2,
    [3]: 3,
    [4]: 4,
    [5]: 4,
    [6]: 4,
    [7]: 4,
    [8]: 1,
    [9]: 1,
    [10]: 2,
    [11]: 3
  };

  type: number;
  name: string;
  onSite: boolean;
  distance: boolean;
}
