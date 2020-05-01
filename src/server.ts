import express from 'express';

const app = express();

app.get('/', (request, response) => response.send('ok'));

app.listen(3000, () => {
  console.log('Listening');
});
