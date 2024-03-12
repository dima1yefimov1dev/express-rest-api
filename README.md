# RESTful API for markeptlace

This is RESTful API service, created with MongoDB + mongoose, Express, NodeJs and TypeScript. This api let you make marketplace with products, which you can add, update and delete.

# Features

- Node Js + TypeScript
- MongoDB + mongoose
- Express, express-validator,
- custom middleware for errors
- auth with jwt tokens,

# How to start:

install project dependencies:

```bash
npm install
```

Create .env with enviroment variables:

```bash
PORT=3001
DB_URL = 'your link here'
JWT_ACCESS_SECRET_KEY='your secret key here',
JWT_REFRESH_SECRET_KEY='your secret refresh key here'

```

Start project and enjoy :)
```bash
npm start
```

If u want to use it in dev mode with nodemon then :
```bash
npm run dev
```

# API endpoints

| Endpoint          | Method | Description                   |
|-------------------|--------|-------------------------------|
| /api/products     | GET    | Get all products              |
| api/products      | POST   | Create a new product          |
| api/products/:id  | PATCH  | Update a product by ID        |
| api/products/:id  | DELETE | Delete a product by ID        |
| api/auth/signup   | POST   | Register new user             |
| api/auth/signin   | POST   | authorization                 |
| api/auth/signout  | POST   | logout                        |
| api/auth/refresh  | POST   | refresh token                 |
