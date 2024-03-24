# User API Specification

## Get All User

Endpoint : GET /api/user

Headers :

```
curl -X 'GET' \
  'http://localhost:3000/api/user' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success) :

```json
[
  {
    "uuid": "c7015e01-6ba4-4beb-8db8-da429df71d8c",
    "username": "rizky",
    "email": "rizky@gmail.com",
    "token": null,
    "createdAt": "2024-03-23T06:00:34.327Z",
    "updatedAt": "2024-03-23T06:00:34.327Z"
  },
  {
    "uuid": "330de0e0-1473-47f0-b4c3-ea53be3211b8",
    "username": "haksono",
    "email": "haksono@gmail.com",
    "token": null,
    "createdAt": "2024-03-23T06:00:34.357Z",
    "updatedAt": "2024-03-23T06:00:34.357Z"
  },
  {
    "uuid": "a681f3fe-4e28-4dca-87f1-84a01ad98008",
    "username": "praz",
    "email": "praz@gmail.com",
    "token": null,
    "createdAt": "2024-03-23T08:41:42.774Z",
    "updatedAt": "2024-03-23T08:41:42.774Z"
  },
  {
    "uuid": "3bfd2624-a8ac-4da7-9eee-233f84d25344",
    "username": "marlo",
    "email": "marlo@gmail.com",
    "token": "{your_access_token}",
    "createdAt": "2024-03-23T08:39:47.576Z",
    "updatedAt": "2024-03-23T08:58:29.903Z"
  }
]
```

Response Body (Failed) :

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Find One User

Endpoint : GET /api/user/{uuid}

Headers :

```
curl -X 'GET' \
  'http://localhost:3000/api/user/{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success) :

```json
[
  {
    "uuid": "c7015e01-6ba4-4beb-8db8-da429df71d8c",
    "username": "rizky",
    "email": "rizky@gmail.com",
    "token": null,
    "createdAt": "2024-03-23T06:00:34.327Z",
    "updatedAt": "2024-03-23T06:00:34.327Z"
  }
]
```

Response Body (Failed) :

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Update User

Endpoint : PATCH /api/user/{uuid}

Headers :

```
curl -X 'PATCH' \
  'http://localhost:3000/api/user{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success) :

```json
{
  "uuid": "string",
  "username": "string",
  "email": "string",
  "token": "string",
  "createdAt": "2024-03-24T13:44:36.306Z",
  "updatedAt": "2024-03-24T13:44:36.306Z"
}
```

Response Body (Failed) :

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Delete User

Endpoint : DELETE /api/user/{uuid}

```
curl -X 'DELETE' \
  'http://localhost:3000/api/user{uuid}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {your_access_token}'
```

Response Body (Success) :

```json
{
  "uuid": "string",
  "username": "string",
  "email": "string",
  "token": "string",
  "createdAt": "2024-03-24T13:45:53.669Z",
  "updatedAt": "2024-03-24T13:45:53.669Z"
}
```

Response Body (Failed) :

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```
