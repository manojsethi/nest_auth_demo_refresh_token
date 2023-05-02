
# NestJS Authentication Demo with AuthToken and RefreshToken, MongoDB as Database and PassportJS as Authentication Middleware Library

### This is a base of a new project that require credentials authentication. 

#### Technologies Used

- NestJS
- ExpressJS
- MongoDB
- PassportJS(JWT)
- argon2

**Frontend - NextJS(Next-Auth)** - https://github.com/manojsethi/next-auth-demo

You can replace the file env.example to .env in your local environment and replace the values with real values

You can create the secret keys with the below little utility

```
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
OR
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

## Usage/Examples

```
npm i

npm run start:dev
```

API can be listened at localhost 3000


## API Reference

#### Sign Up a new user

```http
  POST /auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the person signing up |
| `email` | `string` | **Required**. Email of the person signing up |
| `password` | `string` | **Required**. Password of the person signing up |

Password is hashed and saved in the db. 

**Example**
```
{
    "name": "Manoj",
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

### Auth Endpoints
#### SignIn

```http
  GET /auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email of the person signing in |
| `password` | `string` | **Required**. Password of the person signing in |

**Example**
```
{
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

#### SignIn

```http
  POST /auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email of the person signing in |
| `password` | `string` | **Required**. Password of the person signing in |

**Example**
```
{
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

After you are logged in you need to set the Authorization Header with the value of Bearer {{AccessToken}} in order to access the further API

#### RefreshToken

```http
  GET /auth/refresh
```
**NOTE** You need to pass Authorization Header with Bearer {{RefreshToken}} (RefreshToken received in signin request) to get the new pair of tokens.

```http
  GET /auth/logout
```
**NOTE** You need to pass Authorization Header with Bearer {{AccessToken}} (AccessToken received in signin request) as Logout is a secured route and is authenticated by AccessToken.

### Users Endpoints

#### Get All Users

```http
  GET /users
```

#### Get User By ID

```http
  GET /users/:id
```

#### Update User By ID

```http
  PATCH /users/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional** Name of the person |
| `email` | `string` | **Optional** Email of the person |
| `password` | `string` | **Optional** Password of the person |

**Example**
```
{
    "email": "manojsethi@manojsethi.com",
    "password": "MyRandomPassword"
}
```

#### Delete User By ID

```http
  DELETE /users/:id
```

## 🚀 About Me [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://in.linkedin.com/in/sethimanoj)
I'm a full stack developer working with Javascript Technologies. I have experience with
- NodeJS
- NestJS
- TypeScript
- ReactJS
- NextJS
- Docker
- Kubernetes
- AWS/Digital Ocean/GCP
- NGINX
- GraphQL

