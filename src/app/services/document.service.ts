import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class DocumentService {
 
  getAllDocument(): Promise<any>{
    return axios.get('/Document/getDocument');
  }

}