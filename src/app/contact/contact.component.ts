import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';

import { ContactService } from './contact.service';

/** General animation data for the slideEnter animations */
const generalStyleInfo = {
  stylePre: style({ overflow: 'hidden', height: '0px', 'min-height': '0px', display: '*', 'padding-top': '0px', 'padding-bottom': '0px' }),
  stylePost: style({ height: '*', 'min-height': '0px', display: '*', 'padding-top': '*', 'padding-bottom': '*' })
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('slideEnterQuickDelay', [
      transition(':enter', [generalStyleInfo.stylePre, animate('1s ease-in-out', generalStyleInfo.stylePost)])
    ]),
    trigger('slideEnterLongDelay', [
      transition(':enter', [generalStyleInfo.stylePre, animate('1s 1.5s ease-in-out', generalStyleInfo.stylePost)])
    ])
  ]
})
export class ContactComponent {
  /** The form group for contact emails */
  contactGroup: FormGroup;
  /** The max length of form inputs */
  maxlength = { name: 60, email: 320, message: 500 };
  /** The status of the email */
  emailStatus: 'unsent'|'pending'|'success'|'error'|'unexpectedError';

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
    });
    this.emailStatus = 'unsent';
  }

  get nameControl(): AbstractControl { return this.contactGroup.get('name') }
  get emailControl(): AbstractControl { return this.contactGroup.get('email') }
  get messageControl(): AbstractControl { return this.contactGroup.get('message') }

  /** Submits the form contact form */
  onSubmit(): void {
    // if (this.trimAndValidate() && this.contactGroup.valid) {
      this.emailStatus = 'pending';
      this.contactGroup.disable();
      this.contactService.sendContactEmail(this.nameControl.value, this.emailControl.value, this.messageControl.value)
        .subscribe(({ success, errors }) => {
          this.contactGroup.enable();
          if (success) {
            this.emailStatus = 'success';
          } else if (errors) {
            this.emailStatus = 'error';
            console.log(errors);
          } else this.emailStatus = 'unexpectedError';
        })
    // } 
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
