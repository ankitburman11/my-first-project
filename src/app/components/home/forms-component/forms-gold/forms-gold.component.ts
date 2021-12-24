import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, pluck } from 'rxjs/operators';
import { GoldItem } from '../../../../models/goldItem';
import { HomeDataService } from '../../home-data.service';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'app-forms-gold',
  templateUrl: './forms-gold.component.html',
  styleUrls: ['./forms-gold.component.css'],
})
export class FormsGoldComponent implements OnInit {
  currentHallmarkPrice: number | undefined = 0;
  currentKDMPrice: number | undefined = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private homeDataService: HomeDataService,
    private store: Store<fromApp.AppState>
  ) {

  }
  goldData!: FormGroup;
  netPrice = 0;
  isExchange = false;

  @Output() goldDataEmitter: EventEmitter<GoldItem> = new EventEmitter();

  get goldItemsControls() {
    return (this.goldData?.get('goldItems') as FormArray).controls;
  }

  get exchangeItemsControls() {
    return (this.goldData?.get('exchangeItems') as FormArray).controls;
  }

  ngOnInit() {
    this.goldData = this.fb.group({
      goldItems: this.fb.array([]),
      exchangeItems: this.fb.array([]),
    });
    this.onAddGoldItems();
  }

  onAddExchange() {
    this.isExchange = true;
    const exchangeItemToAdd = this.fb.group({
      groupId: [''],
      totalWeight: ['', Validators.required],
      weightPercentage: ['', Validators.required],
      rate: ['', Validators.required],
      netWeight: [''],
      amount: [''],
    });

    const myExchangeArray = <FormArray>this.goldData?.controls['exchangeItems'];
    exchangeItemToAdd.controls['groupId'].patchValue(myExchangeArray.length);

    exchangeItemToAdd.valueChanges.pipe(debounceTime(400)).subscribe((data) => {
      this.exchangeItemAdded(data);
    });

    myExchangeArray.push(exchangeItemToAdd);
  }

  exchangeItemAdded(data: any): void {
    const index = data['groupId'];
    const exchangeGroup = (<FormArray>this.goldData?.get('exchangeItems'))
      .controls[index]?.value;
    console.log('exchangeItemToAdd', exchangeGroup);

    const [netWeight, amount] =
      this.homeDataService.getExchangePrice(exchangeGroup);
    exchangeGroup.netWeight = netWeight;
    exchangeGroup.amount = amount;
    console.log('final exchg', exchangeGroup);
    this.goldDataEmitter.emit(this.goldData?.value);
  }

  onDeleteExchangeItem(i: number) {
    if ((<FormArray>this.goldData?.get('exchangeItems')).length === 1) {
      this.isExchange = false;
    }
    (<FormArray>this.goldData?.get('exchangeItems')).removeAt(i);
    this.goldDataEmitter.emit(this.goldData?.value);
  }

  onDeleteGoldItem(i: number) {
    (<FormArray>this.goldData?.get('goldItems')).removeAt(i);
    this.goldDataEmitter.emit(this.goldData?.value);
  }
  onAddGoldItems() {
    const itemToAdd = this.fb.group({
      groupId: '',
      typeGold: ['hallmark', Validators.required],
      weightGold: ['', Validators.required],
      makingChargeGold: [11, Validators.required],
      makingChargeRupee: [''],
      rateGold: ['', Validators.required],
      amountGoldItem: [''],
    });

    const myFormArray = <FormArray>this.goldData?.get('goldItems');
    itemToAdd?.get('groupId')?.patchValue(myFormArray.length);
    this.store
      .select('items')
      .pipe(pluck('rate'))
      .subscribe((data) => {
        this.currentHallmarkPrice = data.goldHallmark;
        this.currentKDMPrice = data.goldKdm;
      });

    // if (itemToAdd.get('typeGold').value === 'hallmark') {
    //   itemToAdd.get('rateGold').patchValue(this.currentHallmarkPrice);
    // } else {
    //   itemToAdd.get('rateGold').patchValue(this.currentKDMPrice);
    // }
    itemToAdd.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.onValueChanged(data));

    myFormArray.push(itemToAdd);
  }

  onValueChanged(data: any) {
    const index = data['groupId'];
    const changedFormGroup = (<FormArray>this.goldData?.get('goldItems'))
      .controls[index]?.value;

    // if (data['typeGold'] === 'hallmark') {
    //   // (<FormArray>this.goldData?.get('goldItems')).controls[index].patchValue({
    //   //   rateGold: this.currentHallmarkPrice,
    //   // });
    //   changedFormGroup.rateGold = this.currentHallmarkPrice;
    // } else {
    //   changedFormGroup.rateGold = this.currentKDMPrice;
    //   // (<FormArray>this.goldData?.get('goldItems')).controls[index].patchValue({
    //   //   rateGold: this.currentKDMPrice,
    //   // });
    // }

    if (changedFormGroup?.weightGold && changedFormGroup?.rateGold) {
      changedFormGroup.amountGoldItem =
        this.homeDataService.getGoldPrice(changedFormGroup);
      console.log(changedFormGroup);
      this.goldDataEmitter.emit(this.goldData?.value);
    }
  }
  onSave() {
    this.router.navigate(['/addSales']);
  }

  onClear() {
    // this.goldData?.reset();
    // <FormArray>this.goldData?.get('goldItems') = this.fb.array([]);
    const goldFormArray = <FormArray>this.goldData?.get('goldItems');
    const exchangeFormArray = <FormArray>this.goldData?.get('exchangeItems');
    while (goldFormArray.length !== 0) {
      goldFormArray.removeAt(0);
    }

    while (exchangeFormArray.length !== 0) {
      exchangeFormArray.removeAt(0);
    }

    this.onAddGoldItems();
    this.isExchange = false;
    this.goldDataEmitter.emit(this.goldData?.value);
  }

  onCheckHallmark(i: number) {
    const currentFormGroup = (<FormArray>this.goldData?.get('goldItems'))
      .controls[i];
    currentFormGroup?.get('makingChargeGold')?.patchValue(11);
    currentFormGroup?.get('rateGold')?.patchValue(this.currentHallmarkPrice);
  }
  onCheckKDM(i: number) {
    const currentFormGroup = (<FormArray>this.goldData?.get('goldItems'))
      .controls[i];
    currentFormGroup.get('makingChargeGold')?.patchValue(9);
    currentFormGroup.get('rateGold')?.patchValue(this.currentKDMPrice);
  }
  clearFormArray = (formArray: FormArray) => {
    formArray = this.fb.array([]);
  };
}
