import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.css'],
})
export class UserDetailFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.parentForm.addControl('name', nameControl)
  }

}
