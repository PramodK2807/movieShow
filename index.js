const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getFavData = () => {
  try {
    const jsonData = fs.readFileSync('db.json', 'utf-8');
    return JSON.parse(jsonData) || [];
  } catch (error) {
    return [];
  }
};

const saveMovieData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync('db.json', stringifyData);
};

// Get all movies from favorites
app.get('/api/favourites', (req, res) => {
  const data = getFavData();
  return res.status(200).send({
    data,
  });
});

// Post ( add movie to favorites)
app.post('/api/favourites', (req, res) => {
  const existMovie = getFavData();
  const dataFromReq = req.body;

  const findExist = existMovie.favourites.find(
    (movie) => movie.id === dataFromReq.id
  );

  if (findExist) {
    return res.status(409).send({ error: true, msg: 'Movie already exists' });
  } else {
    existMovie.favourites.push(dataFromReq);
    saveMovieData(existMovie);
    res.send({
      success: true,
      msg: `${dataFromReq.title} is added to Fav`,
    });
  }
});

// Delete Fav List

app.delete('/api/favourites', (req, res) => {
  const existMovie = getFavData();
  const movieIdToDelete = req.body.id;
  const title = req.body.title;
  const indexToDelete = existMovie.favourites.findIndex(
    (movie) => movie.id === movieIdToDelete
  );

  if (indexToDelete === -1) {
    return res
      .status(404)
      .send({ error: true, msg: 'Movie not found in favorites' });
  }
  existMovie.favourites.splice(indexToDelete, 1);
  saveMovieData(existMovie);
  res.send({
    success: true,
    msg: `${title} is removed from Fav`,
  });
});

app.listen(PORT, () => {
  console.log(`listening at port:${PORT}`);
});
