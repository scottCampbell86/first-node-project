const express = require('express');
const app = express();

app.get('/whatever/:latitude/:longitude', (req, res) => {
    res.json {(
      some:'json'
    )};
});

app.listen(3000, () => {
    console.log('idk');
});

app.get(*, (req, res) => {
  res.json({
    nada: '404'
  });
})
