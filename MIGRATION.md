# Migration

## From version 1.x.x to 2.0.0

### 2.0 breaking changes

#### `Strategy` is exported as ES6 default export

The rewrite to TypeScript required breaking change in the way `Strategy`is exported by the module. ES6 default exports are meant to act as a replacement for CommonJS module exports; however, the two are incompatible.

Example of broken CommonJS code:

```Javascript
const Strategy = require('@superfaceai/passport-twitter-oauth2');
...
```

The above code will result in runtime error: `TypeError: Strategy is not a constructor`

The fix it use:

```Javascript
const Strategy = require('@superfaceai/passport-twitter-oauth2').default;
...
```