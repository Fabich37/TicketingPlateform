var express = require('express');
var router = express.Router();

var methods ={
  getTickets: function () {
    const tickets = [['catch', '24/08/2019', '12/09/2019', '12/09/2019', '55'],
      ['racing', '01/03/2020', '10/08/2020', '10/08/2020', '23'],
      ['concert', '19/04/2019', '09/09/2019', '09/09/2019', '37']];
  },
  buyTicket: function (req) {

  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('tickets', { ticketsList: methods.getTickets(), title: 'List of tickets' });
});

module.exports = router;
