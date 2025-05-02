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
import { BranchService } from '../../../services/branch.service';
import { ProductService } from '../../../services/product.service';
import { DocumentService } from '../../../services/document.service';
import { UnsquaredRangesViewModel } from "../unsquaredRangesView";
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


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
  displayedColumns: string[] = ["id", "danoax", "dcodsucax", "dnomsucax", "dcoprax", "dcodoax", "dfearax", "ddifax", "dsfarax", "dresax"];
  dataSource: UnsquaredRangesViewModel[] = [];  
  totalItems: number = 0;
  pageSize: number = 10;

  constructor(private _conciliationServiceObj: ConciliationService, 
              private _unsquaredRangesServiceObj: UnsquaredRangesService,
              private _branchServiceObj: BranchService,
              private _productServiceObj: ProductService,
              private _documentServiceObj: DocumentService) {
      
      this.unsquaredRangesForm = new FormGroup({
        sucax: new FormControl(null, [Validators.required]),
        prax: new FormControl(null, [Validators.required]),
        dfearax: new FormControl(new Date(), [Validators.required])
      });
  
    }
  
    ngOnInit() {
  
      this._branchServiceObj.getAllBranch()
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
  
      this._productServiceObj.getAllProduct()
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

    }


    fetchUnsquaredRangesList(){

      let dateConciliation = this.unsquaredRangesForm.get('dfearax')!.value;

      let yearConciliation = dateConciliation.getFullYear();
      let monthConciliation = dateConciliation.getMonth();
      let dayConciliation = dateConciliation.getDay();

      let newMonthConciliation = monthConciliation.toString().length === 1? "0" + monthConciliation.toString():monthConciliation.toString();
      let newDayConciliation = dayConciliation.toString().length === 1? "0" + dayConciliation.toString():dayConciliation.toString();
      

      this._unsquaredRangesServiceObj.getAll(yearConciliation.toString(), newMonthConciliation, newDayConciliation, this.unsquaredRangesForm.get('sucax')!.value, this.unsquaredRangesForm.get('prax')!.value)
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

      this.fetchUnsquaredRangesList();
    }
  
}
