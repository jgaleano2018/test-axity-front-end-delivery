import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import Swal from 'sweetalert2'
import {
  FormControl,
  Validators
} from "@angular/forms";

import { ConciliationModel } from "./conciliation";
import { ConciliationService } from "./conciliation.service";
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
  formGroupDir = inject(FormGroupDirective);
  conciliationForm!: FormGroup<any>;
  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];
  doaxList: DocumentModel[] = [];

  invalidNamesArr: string[] = ["Hello", "Angular"];

  constructor(private _conciliationServiceObj: ConciliationService) {
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

    this._conciliationServiceObj.getAllDocument()
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

  ngOnInit() {
    /*this.conciliationForm = new FormGroup({
      afearax: new FormControl(new Date(), [Validators.required]),
      sucax: new FormControl(this.sucaxList, [Validators.required]),
      prax: new FormControl(this.praxList, [Validators.required]),
      doax: new FormControl(this.doaxList, [Validators.required]),
      adifax: new FormControl(0.00, [Validators.required]),
      asfarax: new FormControl(0.00, [Validators.required]),
      aresax: new FormControl(null, [Validators.required])
    });*/

    this.conciliationForm = this.formGroupDir.form.get('conciliation') as FormGroup;

  }

  onSubmit() {
    console.log(this.conciliationForm);
    
    const conciliationItem: ConciliationModel = new ConciliationModel(
      1,
      this.conciliationForm.get('afearax')!.value,
      this.conciliationForm.get("sucax")!.value,
      this.conciliationForm.get("prax")!.value,
      this.conciliationForm.get("doax")!.value,
      this.conciliationForm.get("adifax")!.value,
      this.conciliationForm.get("asfarax")!.value,
      this.conciliationForm.get("aresax")!.value
    );

  }

}