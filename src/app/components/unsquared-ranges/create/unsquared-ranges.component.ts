import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import Swal from 'sweetalert2'
import {
  FormControl,
  Validators
} from "@angular/forms";
import { BranchModel } from "../branch";
import { ProductModel } from "../product";
import { DocumentModel } from "../document";
import { UnsquaredRangesService } from "../unsquared-ranges.service";
import { ConciliationService } from "../../conciliation/conciliation.service";
import { YearUnsquaredRangesModel } from "../yearUnsquaredRanges";

@Component({
  selector: 'app-unsquared-ranges',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './unsquared-ranges.component.html',
  styleUrl: './unsquared-ranges.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsquaredRangesComponent implements OnInit {
  formGroupDir = inject(FormGroupDirective);
  unsquaredRangesForm!: FormGroup<any>;
  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];
  doaxList: DocumentModel[] = [];
  danoaxList: YearUnsquaredRangesModel[] = [];
  dconaxList: YearUnsquaredRangesModel[] = [];

  invalidNamesArr: string[] = ["Hello", "Angular"];

  constructor(private _conciliationServiceObj: ConciliationService, private _unsquaredRangesServiceObj: UnsquaredRangesService) {
    this.danoaxList = [];
    this.dconaxList = [];

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


    let countYear = 1;
    for (let yearStart = 2000; yearStart <= 2050; yearStart++) {

      this.danoaxList.push({ id: countYear, value: yearStart.toString() });

      countYear++;

    }

    for (let dayStart = 1; dayStart <= 31; dayStart++) {

      let newDayStart = dayStart.toString().length == 1 ? "0" + dayStart.toString() : dayStart.toString();

      this.dconaxList.push({ id: countYear, value: newDayStart });

    }
  }

  ngOnInit() {

    /*this.unsquaredRangesForm = new FormGroup({
      danoax: new FormControl(null, [Validators.required]),
      dmesax: new FormControl(null, [Validators.required]),
      dconax: new FormControl(null, [Validators.required]),
      sucax: new FormControl(this.sucaxList, [Validators.required]),
      prax: new FormControl(this.praxList, [Validators.required]),
      doax: new FormControl(this.doaxList, [Validators.required]),
      dfearax: new FormControl(new Date(), [Validators.required]),
      ddifax: new FormControl(0.00, [Validators.required]),
      dsfarax: new FormControl(0.00, [Validators.required]),
      dresax: new FormControl(null, [Validators.required])
    });*/

    this.unsquaredRangesForm = this.formGroupDir.form.get('unsquaredRanges') as FormGroup;

  }

  onSubmit() {
    console.log(this.unsquaredRangesForm);
  }

}