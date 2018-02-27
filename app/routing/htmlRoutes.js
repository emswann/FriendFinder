/**
 * @file Server side HTML functionality. 
 * @author Elaina Swann
 * @version 1.0 
*/

var path = require('path');

module.exports = app => {
  app.get('/survey', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/survey.html')));

  app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/home.html')));
};