import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  /** The form group for contact emails */
  contactGroup: FormGroup;
  /** The max length of form inputs */
  maxlength = { name: 60, email: 320, message: 500 }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactGroup = this.fb.group({
      name: ['', Validators.compose([
        Validators.required, Validators.maxLength(this.maxlength.name), this.onlyWhitespaceValidator
      ])],
      email: ['', Validators.compose([
        Validators.required, Validators.email, Validators.maxLength(this.maxlength.email)
      ])],
      message: ['', Validators.compose([
        Validators.required, Validators.maxLength(this.maxlength.message), this.onlyWhitespaceValidator
      ])]
    })
  }

  get nameControl(): AbstractControl { return this.contactGroup.get('name') }
  get emailControl(): AbstractControl { return this.contactGroup.get('email') }
  get messageControl(): AbstractControl { return this.contactGroup.get('message') }

  /** Submits the form contact form */
  onSubmit(): void {
    this.trimAndValidate() && this.contactGroup.valid && console.log('All Works')
  }

  /** Trim the value for each control and return the form group validation status */
  private trimAndValidate(): boolean {
    try {
      ([this.nameControl, this.emailControl, this.messageControl]).forEach(control => {
        control.setValue((control.value + '').trim())
      })
    } catch (_) { }
    return this.contactGroup.valid;
  }

  /** Custom angular validator to check if the field is only white space */
  private get onlyWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      (control.value || '').trim().length ? null : { 'whitespace': { value: control.value } };
  }
}
