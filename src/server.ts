import express from 'express';

import routers from './routers';

const app = express();

app.use(routers);

app.get('/', (request, response) => response.send('ok'));

app.listen(3000, () => {
  console.log('Listening');
});
