import express from 'express';

const app = express();
const PORT = 3000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
};

start();
