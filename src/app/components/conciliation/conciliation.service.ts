import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class ConciliationService {
 
  getAllBranch (): Promise<any>{
    return axios.get('/conciliation/branch');
  }

  getAllProduct (): Promise<any>{
    return axios.get('/conciliation/product');
  }

  getAllDocument (): Promise<any>{
    return axios.get('/conciliation/document');
  }

  create(conciliationList: any, unsquaredRangesObject: any, monthConciliationRequest: string, yearConciliationRequest: string): Promise<any>{
    const bodyRequest = {
      "conciliationToCreate": conciliationList,
      "unsquaredRangesToCreate": unsquaredRangesObject,
      "monthConciliationRequest": monthConciliationRequest,
      "yearConciliationRequest": yearConciliationRequest
    }

    return axios.post('/conciliation', bodyRequest);
  }

  
}