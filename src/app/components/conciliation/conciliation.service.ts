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
  
  getById (id:number): Promise<any>{
    return axios.get('/logCountries/' + id);
  }

  create(conciliationList: any, unsquaredRangesObject: any, monthConciliationRequest: string, yearConciliationRequest: string): Promise<any>{
    return axios.post('/conciliation', {conciliationToCreate: conciliationList, unsquaredRangesToCreate: unsquaredRangesObject, monthConciliationRequest: monthConciliationRequest, yearConciliationRequest: yearConciliationRequest});
  }

  
}