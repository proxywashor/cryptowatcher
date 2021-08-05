import express from 'express';
import routes from './api/router';
import connect from './db/connect';

const app = express();
const port = 3000;

const db = 'mongodb://localhost/cryptowatcher';

connect({ db });

app.use(express.json());
app.use(routes);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
