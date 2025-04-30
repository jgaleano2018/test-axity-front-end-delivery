import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class UnsquaredRangesService {
 
  getAll (): Promise<any>{
    return axios.get('/unsquaredRanges');
  }  
}