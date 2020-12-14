import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {
  name: string;
  surname: string;
  email: string;
  public subscribe: boolean = true;
  public daily: SelectOption = null;
  public select: Array<SelectOption> = [
    { key: 'day', value: 'Every day' },
    { key: 'week', value: 'Every week' },
    { key: 'month', value: 'Every month' },
    { key: 'never', value: 'Never' },
  ];

  constructor(private alert: AlertService) {}

  submit(form: NgForm) {
    console.log(form);
    this.alert.success('Thank you, we will get back to you!');
  }
  show(form){
    console.log(form);
    
  }
}
