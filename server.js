const express = require('express');
const { connect } = require('mongoose');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

