var express = require('express');
var router = express.Router();

/*const TESTS = [['test1.1', 'test1.2'],
  ['test2.1', 'test2.2'],
  ['test3.1', 'test3.2']];
var verif = false;

TESTS.forEach(
    test => {
      if(test[0] == 'test2.1'){
        console.log('OK');
        verif = true;
      }else{
        console.log('NOPE');
      }
    }
)

console.log(verif);*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('tickets', { title: 'Tickets list'});
});

module.exports = router;
