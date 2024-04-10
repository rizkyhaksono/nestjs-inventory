# Item API Specification

## Get All Item

Endpoint: GET /api/item

Headers:

```
curl -X 'GET' \
  'http://localhost:3000/api/item' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success):

```json
[
  {
    "name": "string",
    "quantity": 0,
    "userId": "string"
  }
]
```

Response Body (Failed):

```json
{
  "message": "Cannot GET /api/items",
  "error": "Not Found",
  "statusCode": 404
}
```

## Get Item By UUID

Endpoint: GET /api/item/{uuid}

Headers:

```
curl -X 'GET' \
  'http://localhost:3000/api/item/{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success):

```json
{
  "name": "string",
  "quantity": 0,
  "userId": "string"
}
```

Response Body (Failed):

```json
{
  "message": "Cannot GET /api/items/test-uuid",
  "error": "Not Found",
  "statusCode": 404
}
```

## Create Item

Endpoint: POST /api/item

Headers:

```
curl -X 'POST' \
  'http://localhost:3000/api/item/{uuid}' \
  -H 'accept: application/json'
```

Response Body (Success):

```json
{
  "name": "string",
  "quantity": 0,
  "userId": "string"
}
```

Response Body (Failed):

```json
{
  "message": "Expected double-quoted property name in JSON at position 39",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Update Item

Endpoint: PATCH /api/item/{uuid}

Headers:

```
curl -X 'PATCH' \
  'http://localhost:3000/api/item/{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success):

```json
{
  "name": "string",
  "quantity": 0,
  "userId": "string"
}
```

Response Body (Failed):

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Delete Item

Endpoint: DELETE /api/item/{uuid}

Headers:

```
curl -X 'DELETe' \
  'http://localhost:3000/api/item/{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success):

```json
{
  "uuid": "string",
  "username": "string",
  "email": "string",
  "token": "string",
  "createdAt": "2024-04-08T21:08:03.233Z",
  "updatedAt": "2024-04-08T21:08:03.233Z"
}
```

Response Body (Failed):

```json

```
