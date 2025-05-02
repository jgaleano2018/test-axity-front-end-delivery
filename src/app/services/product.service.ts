import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
 
export class ProductService {
 
  getAllProduct(): Promise<any>{
    return axios.get('/Product/getProduct');
  }

}