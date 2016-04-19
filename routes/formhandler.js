var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");
var handlebars = require('hbs');
var fs = require('fs');

/* form mailer */
router.get('/', function(req, res, next) {
    res.render('formhandler/index', { title: 'Form Handler', layout: '/layouts/layout_formhandler' });
});

router.post('/send/database', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.render('formhandler/index', { title: 'Email Server Test Form' });
});

router.post('/send/email', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var postJsonData = JSON.parse(req.body.data);
    var email = postJsonData.email;
    var emailDecoded = new Buffer(email, 'base64').toString('ascii');
    var url = postJsonData.url;

    fs.readFile('views/formhandler/email.hbs', 'utf-8', function(error, source){
        var template = handlebars.compile(source);
        html = template(postJsonData);

        var from = 'formhandler.demo@gmail.com';
        var message = html;
        var to = emailDecoded;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'formhandler.demo@gmail.com',
                pass: ''
            }
        });

        var mailOptions = {
            from: from,
            to: to,
            subject: url,
            html: message
        }

        transporter.sendMail(mailOptions, function(retError, retResponse){
            var response = {
                status: '200',
                description: 'email sent'
            }

            if(retError){
                response.status = '500';
                response.description = retError;
            }

            res.end(JSON.stringify(response));
        });
    });
});

module.exports = router;
