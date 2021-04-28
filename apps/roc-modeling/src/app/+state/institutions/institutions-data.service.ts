import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { InstitutionsEntity } from './institutions.models';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsDataService
{
  constructor() { }

  institutionsByUnitIds(unitIds: number[]): Observable<InstitutionsEntity[]>
  {
    console.log('unitIds', unitIds);

    // TODO: Replace with new roc gateway api
    return of(null);
    // return of(InstitutionsJson).pipe(
    //   map((data) => {
    //     const allInstitutions = data.RECORDS.map((institutionMapping) => {
    //       return {
    //         unitId: +institutionMapping.unit_id,
    //         opeId: institutionMapping.ope_id,
    //         name: institutionMapping.name,
    //         city: institutionMapping.city,
    //         stateAbbr: institutionMapping.state_abbr,
    //         zipCode: institutionMapping.zip_code,
    //         url: institutionMapping.url,
    //         levelTypeId: +institutionMapping.level_type_id,
    //         levelTypeName: institutionMapping.level_type_name,
    //         controlTypeId: +institutionMapping.control_type_id,
    //         controlTypeName: institutionMapping.control_type_name,
    //         avgNetPriceWithGrantScholarshipAid: +institutionMapping.avg_net_price_with_grant_scholarship_aid,
    //         gr150Default: +institutionMapping.gr150_default
    //       } as InstitutionsEntity;
    //     });

    //     const filtered = allInstitutions.filter((x) =>
    //       unitIds.includes(x.unitId)
    //     );

    //     return filtered;
    //   })
    // );
  }
}
