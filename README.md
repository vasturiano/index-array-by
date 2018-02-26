# indexBy

A utility function to index arrays by any criteria.

`indexBy(list, keyAccessor, multItem = true)`

[![NPM](https://nodei.co/npm/indexby.png?compact=true)](https://nodei.co/npm/indexby/)

## Quick start

```
import indexBy from 'indexby';
```
or
```
const indexBy = require('indexby');
```
or even
```
<script src="//unpkg.com/indexby"></script>
```

## Usage example

Given an array
```
const people = [
    { name: 'Mary', surname: 'Jane', age: 28 },
    { name: 'John', surname: 'Smith', age: 24 },
    { name: 'John', surname: 'Doe', age: 32 }
];
```

Use `indexBy` to index it by a given attribute (string type `keyAccessor`) or any other custom criteria (function type `keyAccessor`):
```
indexBy(people, 'surname', false);
/* {
 Doe: { name: 'John', age: 32 },
 Jane: { name: 'Mary', age: 28 },
 Smith: { name: 'John', age: 24 }
} */

indexBy(people, 'name', true);
/* {
  Mary: [ { surname: 'Jane', age: 28 } ],
  John: [
    { surname: 'Smith', age: 24 },
    { surname: 'Doe', age: 32 }
  ]
} */

indexBy(people, ({ name, surname }) => `${surname}, ${name}`, false);
/* {
 'Jane, Mary: { name: 'Mary', surname: 'Jane', age: 28 },
 'Smith, John': { name: 'John', surname: 'Smith', age: 24 },
 'Doe, John': { name: 'John', surname: 'Doe', age: 32 }
} */

indexBy(people, ({ age }) => `${Math.floor(age / 10) * 10}s`, true);
/* {
  '20s': [
    { name: 'Mary', surname: 'Jane', age: 28 },
    { name: 'John', surname: 'Smith', age: 24 },
  ],
  '30s': [{ name: 'John', surname: 'Doe', age: 32 }]
} */
```
