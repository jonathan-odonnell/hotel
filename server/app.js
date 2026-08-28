const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors')
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});