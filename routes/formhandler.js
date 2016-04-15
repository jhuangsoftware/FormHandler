var express = require('express');
var router = express.Router();

/* form mailer */
router.get('/', function(req, res, next) {
    res.render('formhandler/index', { title: 'Form Handler', layout: '/layouts/layout_formhandler' });
});

router.post('/send/database', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.render('formhandler/index', { title: 'Email Server Test Form' });
});

router.post('/send', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    //res.render(
});

module.exports = router;
