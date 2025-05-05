import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import Swal from 'sweetalert2'
import {
  FormControl,
  Validators
} from "@angular/forms";

import { ConciliationModel } from "./conciliation";
import { ConciliationService } from "./conciliation.service";
import { BranchService } from '../../services/branch.service';
import { ProductService } from '../../services/product.service';
import { DocumentService } from '../../services/document.service';
import { BranchModel } from "./branch";
import { ProductModel } from "./product";
import { DocumentModel } from "./document";

@Component({
  selector: 'app-conciliation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conciliation.component.html',
  styleUrl: './conciliation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConciliationComponent implements OnInit {
  //formGroupDir = inject(FormGroupDirective);
  conciliationForm!: FormGroup<any>;
  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];
  doaxList: DocumentModel[] = [];

  conciliationArray: ConciliationModel[] = [];

  @Output() conciliationEvent = new EventEmitter<ConciliationModel[]>();

  constructor(private _conciliationServiceObj: ConciliationService,
              private _branchServiceObj: BranchService,
              private _productServiceObj: ProductService,
              private _documentServiceObj: DocumentService
  ) {

    console.log("Testing today in may111111111..........");
    this.conciliationForm = new FormGroup({
      afearax: new FormControl(new Date(), [Validators.required]),
      sucax: new FormControl(null, [Validators.required]),
      prax: new FormControl(null, [Validators.required]),
      doax: new FormControl(null, [Validators.required]),
      adifax: new FormControl(0.00, [Validators.required]),
      asfarax: new FormControl(0.00, [Validators.required]),
      aresax: new FormControl(null, [Validators.required])
    });

    this.conciliationArray = [];
    
  }

  ngOnInit() {

    //this.conciliationForm = this.formGroupDir.form.get('conciliation') as FormGroup;

    console.log("Testing today in may..........");

    this._branchServiceObj.getAllBranch()
    .then(({data}) => {
      
      this.sucaxList = data;

      console.log("Testing today in may..........");
      console.log(this.sucaxList);
      
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

    this._documentServiceObj.getAllDocument()
    .then(({data}) => {
      
      this.doaxList = data;
      
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
    console.log("The registration submission was approved.");
    console.log(this.conciliationForm);

    if (this.conciliationArray.length>0) {
      alert("The registration submission was approved.");
    
      this.conciliationEvent.emit(this.conciliationArray);
    }
  }


  addConciliation() {

    const conciliationItem: ConciliationModel = new ConciliationModel(
      1,
      this.conciliationForm.get('afearax')!.value,
      this.conciliationForm.get("sucax")!.value.id_Branch,
      this.conciliationForm.get("prax")!.value.id_Product,
      this.conciliationForm.get("doax")!.value.id_Document,
      this.conciliationForm.get("adifax")!.value,
      this.conciliationForm.get("asfarax")!.value,
      this.conciliationForm.get("aresax")!.value
    );

    this.conciliationArray.push(conciliationItem);

    console.log("Adding conciliation....");
    console.log(this.conciliationArray);

    alert("The record was added.")
  }

}