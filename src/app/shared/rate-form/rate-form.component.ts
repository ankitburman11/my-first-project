import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RateModel } from '../../models/rate';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css'],
})
export class RateFormComponent implements OnInit {
  @Input() entityName?: string;
  rateForm!: FormGroup;
  @Output() rateData: EventEmitter<RateModel> = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.rateForm = this.fb.group({
      goldHallmark: [null],
      goldKdm: [null],
      silver: [null],
      diamond: [null],
    });
    console.log(this.entityName);
  }

  onSubmit() {
    console.log("from shared", this.rateForm?.value);
    this.rateData.emit(this.rateForm?.value);
  }
}
