import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class ConciliationService {

  create(conciliationList: any, unsquaredRangesObject: any, monthConciliationRequest: string, yearConciliationRequest: string): Promise<any>{
    const bodyRequest = {
      "conciliationToCreate": conciliationList,
      "unsquaredRangesToCreate": unsquaredRangesObject,
      "monthConciliationRequest": monthConciliationRequest,
      "yearConciliationRequest": yearConciliationRequest
    }

    return axios.post('/Conciliation/createConciliation', bodyRequest);
  }

  
}