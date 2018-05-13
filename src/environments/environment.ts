// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCn1aRnKJoE0vQpCk6Zt7ZZFuo-L-AeKAI',
    authDomain: 'knnl-43fbb.firebaseapp.com',
    databaseURL: 'https://knnl-43fbb.firebaseio.com',
    projectId: 'knnl-43fbb',
    storageBucket: 'knnl-43fbb.appspot.com',
    messagingSenderId: '267545791501'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
