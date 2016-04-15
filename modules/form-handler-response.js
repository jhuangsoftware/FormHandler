var FormHandlerResponse = function () {};

FormHandlerResponse.prototype.getRequestIp = function (req) {
    var requestIp = '';

    if(req) {
        requestIp = req.ip;
    }

    return requestIp;
};

module.exports = FormHandlerResponse;