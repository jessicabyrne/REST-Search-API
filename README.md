# REST-Search-API

Write a REST search API that takes in a keyword and returns the list of products that have descriptions containing the keyword. A sample keyword would be backpack and that should return 3 products, i.e. 35613901, 35813552, 23117408.

```
GET /api/productids/{keyword}
```

Finds productIDs by keyword.

Upon successful API call, it will return an ARRAY of itemIDs for products that have the keyword in the long description, otherwise it will return an error.

## Starting the project

```bash
node server.js
```

(point your browser at http://localhost:8080)

## Sample request:

http://localhost:8080/api/productids/backpack

Sample response: [ 35813552, 23117408, 35613901 ]

## Running Tests

```bash
npm test
```

This will start `jest`
