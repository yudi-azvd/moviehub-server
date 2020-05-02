import express from 'express';

import routers from './routers';

const app = express();

app.use(routers);

app.listen(3333, () => {
  console.log('Listening');
});
