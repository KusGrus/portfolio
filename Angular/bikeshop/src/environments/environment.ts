// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Enviroment } from './interface';

export const environment: Enviroment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDTxhznK5c4JX85s3lFmtavATDevbExPfA',
    
    authDomain: 'bike-shop-c0beb.firebaseapp.com',
    databaseURL: 'https://bike-shop-c0beb-default-rtdb.firebaseio.com',
    projectId: 'bike-shop-c0beb',
    storageBucket: 'bike-shop-c0beb.appspot.com',
    messagingSenderId: '957256911800',
    appId: '1:957256911800:web:4bd19523fa95caac875d4d',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
