const express = require('express');
const app = express();
const path = require('path')

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname+ '/dist/login/index.html'));
//   })

app.use('/', express.static(path.join(__dirname, 'dist/login')));

// app.use('/documentation', express.static(path.join(__dirname, 'documentation')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/login/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4001,()=>{
  console.log('running on port 4001')
});
