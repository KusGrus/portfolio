import { FormControl } from '@angular/forms';

export class CustomValidators {
  static excludeSelect(...args) {
    return function (control: FormControl): { [key: string]: boolean } {
      if ([...args].includes(control.value)) {
        return {
          restrictedSelect: true,
        };
      }
      return null;
    };
  }

  static onlyDigit(control: FormControl): { [key: string]: boolean } {
    if (isNaN(+control.value)) {
      return {
        onlyDigit: true,
      };
    }
    return null;
  }

  static cardExpiration(control: FormControl): { [key: string]: boolean } {
    if (control.value && control.value.length === 5) {
      let re = /(\d{2})(\/|\\)(\d{2})/;
      let result = control.value.match(re);
      let month = +result[1];
      let year = +result[3];
      let currentYear = +new Date().getFullYear().toString().slice(2);

      if (
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        year > currentYear + 5
      ) {
        return {
          cardExpiration: true,
        };
      }
    }
    return null;
  }

  static calendarDate(control: FormControl): { [key: string]: boolean } {
    if (new Date(control.value) < new Date()) {
      return {
        calendarDate: true,
      };
    }
    return null;
  }

  static selectNonDeafult(control: FormControl): { [key: string]: boolean } {
    if (!control.value) {
      return {
        selectNonDeafult: true,
      };
    }
    return null;
  }
}
