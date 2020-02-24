import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { contactPageTransitions } from '../animations';
import { ContactService, SendContactEmailRes } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: contactPageTransitions
})
export class ContactComponent {
  /** The form group for contact emails */
  contactGroup: FormGroup;
  /** The max length of form inputs */
  maxlength = { name: 60, email: 254, message: 500 };
  /** The maximum number of Inquiries until the session resets */
  maxInquiries = 2;
  /** The status of the email */
  emailStatus: 'unsent' | 'pending' | 'success' | 'error' | 'unexpectedError';
  /** Emits the status of the clients session.sentEmail */
	recentEmailStatus$: Observable<{ sent: number }>;
	/** The current display of the cookie policy */
	cookiePolicyDisplay: boolean;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactGroup = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxlength.name), this.onlyWhitespaceValidator])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxlength.email), Validators.email])],
      message: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxlength.message), this.onlyWhitespaceValidator])]
    });
    this.recentEmailStatus$ = this.contactService.recentEmailStatus;
		this.emailStatus = 'unsent';
		this.cookiePolicyDisplay = false;
  }

  get nameControl(): AbstractControl { return this.contactGroup.get('name') }
  get emailControl(): AbstractControl { return this.contactGroup.get('email') }
  get messageControl(): AbstractControl { return this.contactGroup.get('message') }

  /** Submits the form contact form */
  onSubmit(): void {
    if (this.trimAndValidate() && this.contactGroup.valid) {
    this.emailStatus = 'pending';
    this.contactGroup.disable();
    this.contactService.sendContactEmail(this.nameControl.value, this.emailControl.value, this.messageControl.value)
      .subscribe(({ success, errors }: SendContactEmailRes) => {
        this.contactGroup.enable();
        if (success) this.emailStatus = 'success';
        else if (errors) {
          this.handleFieldApiErrors(errors);
          this.emailStatus = 'error';
        } else this.emailStatus = 'unexpectedError';
      })
    }
  }

  /** Handles and sets the appropriate errors for 422 error response codes */
  private handleFieldApiErrors(errors: SendContactEmailRes['errors']): void {
    errors.forEach(({ param, msg, value }) => {
			let control = this.contactGroup.get(param);
			if (!control) return;
      control.setValue(value);
      if (!control.errors) control.setErrors({ [msg]: true });
      else control.errors[msg] = true;
    });
  }

  /** To update the email status and set the form for another inquiry */
  newInquiry(): void {
    this.messageControl.reset('');
    this.emailStatus = 'unsent';
  }

  /** Trim the value for each control and return the form group validation status */
  private trimAndValidate(): boolean {
    try {
      ([this.nameControl, this.emailControl, this.messageControl])
        .forEach(control => control.setValue((control.value + '').trim()))
    } catch (_) { }
    return this.contactGroup.valid;
  }

  /** Custom angular validator to check if the field is only white space */
  private get onlyWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      (control.value || '').trim().length ? null : { 'whitespace': { value: '#897783' } };
  }
}
