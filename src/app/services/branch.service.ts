import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class BranchService {
 
  getAllBranch(): Promise<any>{
    return axios.get('/Branch/getBranch');
  }

}