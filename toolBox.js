var passport = require('passport');
require('./config/passport')(passport);

var toolBox = module.exports = {};

toolBox.getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
    
toolBox.needsGroup = function(group) {
    return [
        passport.authenticate('jwt', {
            session: false
        }),
        function (req, res, next) {
            console.log('--------------------------------req.user')
            console.log(req.user)
            if (req.user && req.user.group === group)
                next();
            else
                res.send(401, 'Unauthorized : ' + req.user);
        }
    ];
};