import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import Swal from 'sweetalert2'
import {
  FormControl,
  Validators
} from "@angular/forms";
import { BranchModel } from "../branch";
import { ProductModel } from "../product";
import { UnsquaredRangesService } from "../unsquared-ranges.service";
import { ConciliationService } from "../../conciliation/conciliation.service";
import { UnsquaredRangesViewModel } from "../unsquaredRangesVIew";

import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-unsquared-ranges-view',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './unsquared-ranges.component.html',
  styleUrl: './unsquared-ranges.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsquaredRangesComponentView {

  formGroupDir = inject(FormGroupDirective);
  unsquaredRangesForm!: FormGroup<any>;
  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];

  isFilter:boolean = false;
  displayedColumns: string[] = ["actions", "id", "username", "request_timestamp", "num_countries_returned", "countries_details"];
  dataSource: UnsquaredRangesViewModel[] = [];  
  totalItems: number = 0;
  pageSize: number = 10;

  constructor(private _conciliationServiceObj: ConciliationService, private _unsquaredRangesServiceObj: UnsquaredRangesService) {
      
      this._conciliationServiceObj.getAllBranch()
      .then(({data}) => {
        
        this.sucaxList = data;
        
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      });
  
      this._conciliationServiceObj.getAllProduct()
      .then(({data}) => {
        
        this.praxList = data;
        
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      });

      this.fetchUnsquaredRangesList();
  
    }
  
    ngOnInit() {
  
      this.unsquaredRangesForm = new FormGroup({
        sucax: new FormControl(this.sucaxList, [Validators.required]),
        prax: new FormControl(this.praxList, [Validators.required]),
        dfearax: new FormControl(new Date(), [Validators.required])
      });
  
    }


    fetchUnsquaredRangesList(){

      this._unsquaredRangesServiceObj.getAll()
      .then(({data}) => {
        
        this.dataSource = data;
        
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      });
  
    }

    onSubmit() {
      console.log(this.unsquaredRangesForm);  
    }
  
  
}
