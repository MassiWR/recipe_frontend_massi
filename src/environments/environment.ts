// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SPOON_API_KEY: 'b07b5a5efab04a6cbcfc1b9b0108d95b',
  API_SPOON_URL: 'https://api.spoonacular.com/recipes/',
  REST_API_URL: 'https://recipe-app-massi.herokuapp.com/api',
  // key in url
  RANDOM_SPOON_URL: 'https://api.spoonacular.com/recipes/random?apiKey=b07b5a5efab04a6cbcfc1b9b0108d95b&number=20'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
