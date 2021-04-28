import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import SocCipCrosswalkJson from '../../../assets/data/soc_cip_crosswalk.json';
import { InstructionalProgramsEntity } from './instructional-programs.models';

@Injectable({
  providedIn: 'root',
})
export class InstructionalProgramsDataService
{
  constructor() { }

  instructionalPrograms(
    socCode: string
  ): Observable<InstructionalProgramsEntity[]>
  {
    return of(SocCipCrosswalkJson).pipe(
      map((data) =>
      {
        return data.RECORDS.map((instructionalProgramMapping) =>
        {
          return {
            cipCode: instructionalProgramMapping.cip_code,
            cipTitle: instructionalProgramMapping.cip_title,
            socCode: instructionalProgramMapping.soc_code,
            socTitle: instructionalProgramMapping.soc_title,
          };
        }).filter((x) => x.socCode === socCode);
      }),
      map((instructionalProgramMappings: any[]) =>
        instructionalProgramMappings.map(
          (instructionalProgramMapping) =>
            instructionalProgramMapping.cipCode as string
        )
      ),
      switchMap((cipCodeList: string[]) =>
      {
        console.log('cipCodeList', cipCodeList);
        // add degree levels from institution programs
        // TODO: Replace with new roc gateway api
        return of(null);
        // return of(InstructionalProgramWithUnitIdsJson).pipe(
        //   map((data) => {
        //     return data.RECORDS.map((instructionalProgram) => {
        //       return {
        //         cipCode: instructionalProgram.cip_code,
        //         cipTitle: instructionalProgram.cip_title,
        //         degreeLevel: +instructionalProgram.degree_level,
        //         unitIds: JSON.parse(instructionalProgram.unit_ids)
        //       } as InstructionalProgramsEntity;
        //     });
        //   }),
        //   map((instructionalPrograms) => {
        //     return instructionalPrograms.filter((x) =>
        //       cipCodeList.includes(x.cipCode)
        //     );
        //   })
        // );
      })
    );
  }
}
