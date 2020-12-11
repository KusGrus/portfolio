import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { CustomValidators } from '../validators/custom.validators';

@Directive({
  selector: '[selectNonDeafult]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: CustomValidators.selectNonDeafult,
      multi: true,
    },
  ],
})
export class SelectDirective {}
