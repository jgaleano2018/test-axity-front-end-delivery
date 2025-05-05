import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
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
import { BranchService } from '../../../services/branch.service';
import { ProductService } from '../../../services/product.service';
import { DocumentService } from '../../../services/document.service';
import { ConciliationService } from "../../conciliation/conciliation.service";
import { YearUnsquaredRangesModel } from "../yearUnsquaredRanges";
import { UnsquaredRangesModel } from "../unsquaredRanges";

@Component({
  selector: 'app-unsquared-ranges',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './unsquared-ranges.component.html',
  styleUrl: './unsquared-ranges.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsquaredRangesComponent implements OnInit {
  unsquaredRangesForm!: FormGroup<any>;
  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];
  doaxList: DocumentModel[] = [];
  danoaxList: YearUnsquaredRangesModel[] = [];
  dconaxList: YearUnsquaredRangesModel[] = [];
  conciliationArray: UnsquaredRangesModel[] = [];

  @Output() unsquaredRangesEvent = new EventEmitter<UnsquaredRangesModel>();

  constructor(private _conciliationServiceObj: ConciliationService, 
              private _unsquaredRangesServiceObj: UnsquaredRangesService,
              private _branchServiceObj: BranchService,
              private _productServiceObj: ProductService,
              private _documentServiceObj: DocumentService) {
    this.danoaxList = [];
    this.dconaxList = [];
    this.doaxList = [];

    this.unsquaredRangesForm = new FormGroup({
      danoax: new FormControl(null, [Validators.required]),
      dmesax: new FormControl(null, [Validators.required]),
      dconax: new FormControl(null, [Validators.required]),
      sucax: new FormControl(null, [Validators.required]),
      prax: new FormControl(null, [Validators.required]),
      doax: new FormControl(null, [Validators.required]),
      dfearax: new FormControl(new Date(), [Validators.required]),
      ddifax: new FormControl(0.00, [Validators.required]),
      dsfarax: new FormControl(0.00, [Validators.required]),
      dresax: new FormControl(null, [Validators.required])
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

  onSubmit() {
    console.log(this.unsquaredRangesForm);

    const unsquaredRangesItem: UnsquaredRangesModel = new UnsquaredRangesModel(
          1,
          this.unsquaredRangesForm.get('danoax')!.value.id,
          this.unsquaredRangesForm.get("dmesax")!.value,
          this.unsquaredRangesForm.get("dconax")!.value.id,
          this.unsquaredRangesForm.get("sucax")!.value.id_Branch,
          this.unsquaredRangesForm.get("prax")!.value.id_Product,
          this.unsquaredRangesForm.get("doax")!.value.id_Document,
          this.unsquaredRangesForm.get("dfearax")!.value,
          this.unsquaredRangesForm.get("ddifax")!.value,
          this.unsquaredRangesForm.get("dsfarax")!.value,
          this.unsquaredRangesForm.get("dresax")!.value,
        );

    alert("The registration submission was approved.");

    this.unsquaredRangesEvent.emit(unsquaredRangesItem);
  }

}