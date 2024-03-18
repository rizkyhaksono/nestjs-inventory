# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rizky",
  "password": "rahasia",
  "name": "Rizky Haksono"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "rizky",
    "name": "Rizky Haksono"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "rizky",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "rizky",
    "name": "Rizky Haksono",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": {
    "username": "rizky",
    "name": "Rizky Haksono"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- Authorization: token

Request Body (optional):

```json
{
  "password": "new_password",
  "email": "new_email@example.com"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "rizky",
    "email": "new_email@example.com"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": true
}
```
