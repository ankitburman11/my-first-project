import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';
import { GoldItemDetails } from '../../models/goldItemDetails';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css'],
})
export class AddSalesComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  saleDetailsForm!: FormGroup;
  greet?: string;
  subscription?: Subscription;
  get getSaleDataControl() {
    return (this.saleDetailsForm?.get('saleDetail') as FormArray).controls;
  }

  ngOnInit() {
    this.saleDetailsForm = this.fb.group({
      userDetails: this.fb.group({
        userName: ['', Validators.required],
        userPhoneNumber: ['', Validators.required],
      }),
      saleDetail: this.fb.array([]),
      saleDescription: [''],
      saleTotalAmount: [''],
      saleAmountPaid: [''],
    });

    this.subscription = this.store
      .select('items')
      .pipe(take(1), pluck('goldState'))
      .subscribe((data) => {
        this.greet = 'Hello';
        this.saleDetailsForm?.patchValue({
          saleTotalAmount: data[0].netPriceGold,
        });

        data[0].goldItems.forEach((data) => this.addSaleData(data));
        // this.saleDetailsForm.controls['saleDetail'].get('');
      });
  }

  addSaleData(goldData: GoldItemDetails) {
    // (<FormArray>this.saleDetailsForm.get('saleDetail')).push(
    const itemToAdd = this.fb.group({
      groupIndex: '',
      makingChargeGold: [goldData.makingChargeGold],
      weightGold: [goldData.weightGold],
      rateGold: [goldData.rateGold],
      amountGoldItem: [goldData.amountGoldItem],
    });
    const myFormArray = <FormArray>this.saleDetailsForm?.get('saleDetail');

    itemToAdd?.get('groupIndex')?.patchValue(myFormArray.length);

    itemToAdd.valueChanges.subscribe((data) => {
      console.log("uo", data);
      this.onValueChanged(data);
    });

    myFormArray.push(itemToAdd);
    // );
  }

  onValueChanged(data: any) {
    const index = data['groupIndex'];
    const changedFormGroup = (<FormArray>this.saleDetailsForm?.get('saleDetail')).controls[index];
    console.log(changedFormGroup);
  }
  onSubmit() {
    console.log(this.saleDetailsForm?.value);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
