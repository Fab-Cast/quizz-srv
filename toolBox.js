var passport = require('passport');
require('./config/passport')(passport);

var toolBox = module.exports = {};

toolBox.getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');

        // console.log('----------------parted')
        // console.log(parted)

        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
    
toolBox.needsGroup = function(group, groupsAllowed) {
    if(groupsAllowed && groupsAllowed != ''){
        if(groupsAllowed.includes(group)){
            return true
        }
    }
    return false
};