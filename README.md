# RESTful API for markeptlace

This is RESTful API service, created with MongoDB + mongoose, Express, NodeJs and TypeScript. This api let you make marketplace with products, which you can add, update and delete.

# Features

List of key features or functionalities of the project.

- Node Js + TypeScript
- MongoDB + mongoose
- Express

# How to start:

install project dependencies:

```bash
npm install
```

Create .env with enviroment variables:

```bash
PORT=3001
DB_URL = 'your link here'
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
| /products         | GET    | Get all products              |
| /products         | POST   | Create a new product          |
| /products/:id     | PATCH  | Update a product by ID        |
| /products/:id     | DELETE | Delete a product by ID        |
| /users/register   | POST   | Register new user             |
