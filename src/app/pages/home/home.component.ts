//import { Component } from '@angular/core';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, VERSION } from '@angular/core';
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

import { ConciliationModel } from '../../components/conciliation/conciliation';
import { UnsquaredRangesModel } from '../../components/unsquared-ranges/unsquaredRanges';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ConciliationComponent, UnsquaredRangesComponent, UnsquaredRangesComponentView],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  formGroup!: FormGroup<any>;
  formSubmit = new Subject<void>();
  monthList: YearUnsquaredRangesModel[] = [];
  yearList: YearUnsquaredRangesModel[] = [];
  conciliationArrayInput: ConciliationModel[] = [];
  unsquaredRangesInput: UnsquaredRangesModel | undefined;

  constructor(private _conciliationServiceObj: ConciliationService, 
              private _unsquaredRangesServiceObj: UnsquaredRangesService) {

      let countYear = 1;
      for (let yearStart = 2000; yearStart <= 2050; yearStart++) {

        this.yearList.push({ id: countYear, value: yearStart.toString() });

        countYear++;

      }

      this.conciliationArrayInput = [];

  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      monthConciliation: new FormControl(null, [Validators.required]),
      yearConciliation: new FormControl(null, [Validators.required]),
    });
  
  }

  receiveConciliation(conciliationList: ConciliationModel[]) {

    this.conciliationArrayInput = conciliationList;

    console.log("Data conciliarion array to save....");
    console.log(this.conciliationArrayInput);

  }

  receiveUnsquaredRanges(unsquaredRangesData: UnsquaredRangesModel) {

    this.unsquaredRangesInput = unsquaredRangesData;

  }


  onSubmit() {

    if (this.conciliationArrayInput.length>0) {

      this._conciliationServiceObj.create(this.conciliationArrayInput, this.unsquaredRangesInput, this.formGroup.get('monthConciliation')!.value, this.formGroup.get('yearConciliation')!.value)
      .then(({data}) => {
        //this.isSaving = false
        Swal.fire({
          icon: 'success',
          title: 'Conciliations saved successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        
        console.log(data);

        this.conciliationArrayInput = [];

      }).catch(error => {
        //this.isSaving = false
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      });

    }
    else {

      Swal.fire({
        icon: 'error',
        title: 'You must complete all required fields!',
        showConfirmButton: false,
        timer: 1500
      });

    }

  }

  resetMyForm(e: Event) {
    e.preventDefault();
    this.formGroup.reset();
  }

}
