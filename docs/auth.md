# User API Specification

## Register User

Endpoint : POST /api/auth/register

Request Body :

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

Response Body (Success) :

```json
{
  "uuid": "string",
  "username": "string",
  "email": "string",
  "createdAt": "2024-03-24T06:39:34.482Z",
  "updatedAt": "2024-03-24T06:39:34.482Z"
}
```

Response Body (Failed) :

```json
{
  "message": [
    "email must be an email",
    "username must be a string",
    "username should not be empty",
    "password must be longer than or equal to 6 characters",
    "password should not be empty",
    "password must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Login User

Endpoint : POST /api/auth/login

Request Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response Body (Success) :

```json
{
  "accessToken": "string"
}
```

Response Body (Failed) :

```json
{
  "message": ["email must be an email"],
  "error": "Bad Request",
  "statusCode": 400
}
```
