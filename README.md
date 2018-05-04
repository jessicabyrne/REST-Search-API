# REST-Search-API

Write a REST search API that takes in a keyword and returns the list of products that have descriptions containing the keyword. A sample keyword would be backpack and that should return 3 products, i.e. 35613901, 35813552, 23117408.

```
GET /api/productids/{keyword}
```

Finds productIDs by keyword.

Upon successful API call, it will return an ARRAY of itemIDs for products that have the keyword in the long description, otherwise it will return an error.

To get the metadata, [Walmart's Product API](https://developer.walmartlabs.com/docs) was used with an API key. In this branch, one call was made with multiple item ids.

## Starting the project

Make sure you are in the /src folder

```bash
node server.js
```

(point your browser at http://localhost:8080)

## Sample Usage:

Sample Request: http://localhost:8080/api/productids/backpack

Sample Response: [ 35813552, 23117408, 35613901 ]

## Running Tests

```bash
npm test
```

This will start `jest`

To run a coverage report

```bash
npm test --  --coverage
```

![Test Coverage](https://raw.githubusercontent.com/jessicabyrne/REST-Search-API/switching-express-for-hapi/src/testcoverage.png)
