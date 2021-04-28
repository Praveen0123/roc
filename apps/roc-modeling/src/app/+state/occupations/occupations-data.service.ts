import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { OccupationsEntity } from './occupations.models';
import OccupationsJson from '../../../assets/data/occupations.json';

@Injectable({
  providedIn: 'root'
})
export class OccupationsDataService {
  constructor() {}

  occupationSearch(searchTerm: string): Observable<OccupationsEntity[]> {
    return of(OccupationsJson).pipe(
      map((data) => {
        return data.RECORDS.map((occupation) => {
          return {
            onetCode: occupation.onet_code,
            title: occupation.title,
            socCode: occupation.soc_code
          } as OccupationsEntity;
        });
      }),
      map((occupationsEntities) =>
        occupationsEntities.filter(
          (occupationsEntity) =>
            (occupationsEntity.title as string)
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
        )
      )
    );
  }
}
