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

    console.log("Array that content data to Save in a conciliation");
    console.log(bodyRequest)

    return axios.post('/Conciliation/createConciliation', bodyRequest);
  }

  
}