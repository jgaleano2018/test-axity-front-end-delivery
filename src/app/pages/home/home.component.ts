//import { Component } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, OnInit, VERSION } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, FormResetEvent, FormSubmittedEvent, PristineChangeEvent, ReactiveFormsModule, TouchedChangeEvent, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ConciliationComponent } from '../../components/conciliation/conciliation.component';
import { UnsquaredRangesComponent } from '../../components/unsquared-ranges/create/unsquared-ranges.component';
import { UnsquaredRangesComponentView } from '../../components/unsquared-ranges/show/unsquared-ranges.component';
import { makeRequiredControl } from './reactive-form.util';
import { combineLatest, filter, map, scan, Subject } from 'rxjs';
import { controlStatus } from './control-status.operator';
import { YearUnsquaredRangesModel } from '../../components/unsquared-ranges/yearUnsquaredRanges';
import { ConciliationService } from '../../components/conciliation/conciliation.service';
import { UnsquaredRangesService } from '../../components/unsquared-ranges/unsquared-ranges.service';
import { BranchModel } from '../../components/conciliation/branch';
import { ProductModel } from '../../components/conciliation/product';
import { DocumentModel } from '../../components/conciliation/document';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe, ConciliationComponent, UnsquaredRangesComponent, UnsquaredRangesComponentView],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  version = VERSION.full;
  formGroupDir = inject(FormGroupDirective);
  formGroup!: FormGroup<any>;
  formSubmit = new Subject<void>();
  formControls = this.formGroup.controls;

  formReset$ = this.formGroup.events.pipe(
    filter((e) => e instanceof FormResetEvent),
    map(() => new Date().toISOString()),
    scan((acc, timestamp) => ({
        timestamp,
        count: acc.count + 1,
      }), { timestamp: '', count: 0 }),
  );

  formSubmit$ = this.formGroup.events.pipe(
    filter((e) => e instanceof FormSubmittedEvent),
    map(({ source }) => ({ 
      timestamp: new Date().toISOString(),
      values: source.valid ? source.value: {} 
    })),
  );

  sucaxList: BranchModel[] = [];
  praxList: ProductModel[] = [];
  doaxList: DocumentModel[] = [];
  
  monthList: YearUnsquaredRangesModel[] = [];
  yearList: YearUnsquaredRangesModel[] = [];
  
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
    this.formGroup = new FormGroup({
      monthConciliation: new FormControl(null, [Validators.required]),
      yearConciliation: new FormControl(null, [Validators.required]),
      /*company: new FormGroup({
        name: makeRequiredControl(''),
        line1: makeRequiredControl(''),
        line2: makeRequiredControl(''),
        city: makeRequiredControl(''),
      })*/

      conciliation: new FormGroup({
        afearax: makeRequiredControl(new Date()),
        sucax: makeRequiredControl(this.sucaxList),
        prax: makeRequiredControl(this.praxList),
        doax: makeRequiredControl(this.doaxList),
        adifax: makeRequiredControl(0.00),
        asfarax: makeRequiredControl(0.00),
        aresax: makeRequiredControl('')
      }),

      unsquaredRanges: new FormGroup({
        danoax: makeRequiredControl(''),
        dmesax: makeRequiredControl(''),
        dconax: makeRequiredControl(''),
        sucax: new FormControl(this.sucaxList),
        prax: new FormControl(this.praxList),
        doax: new FormControl(this.doaxList),
        dfearax: makeRequiredControl(new Date()),
        ddifax: makeRequiredControl(0.00),
        dsfarax: makeRequiredControl(0.00),
        dresax: makeRequiredControl('')
      })
  
    });
  
  }

  resetMyForm(e: Event) {
    e.preventDefault();
    this.formGroup.reset();
  }

}
