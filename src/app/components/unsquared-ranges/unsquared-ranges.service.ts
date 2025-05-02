import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class UnsquaredRangesService {
 
  getAll (afearax_year: string, afearax_month: string, afearax_day: string, asidsucax: any, apidprax: any): Promise<any>{
    return axios.get('/unsquaredRanges/'+afearax_year+'/'+afearax_month+'/'+afearax_day+'/'+asidsucax+'/'+apidprax);
  }  
}