const Clarifai = require('clarifai'); // face recognition api
const app = new Clarifai.App({
  apiKey: 'e2696ffcd20943df814e1fb1a75c4e35',
});
const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'));
}


const handleImage = (req, res, db, bcrypt) => {
  const { id } = req.body;
  let found = false;

  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  }).catch(err => res.status(400).json('something went wrong'));
}

module.exports = {
  handleImage,
  handleApiCall,
}
