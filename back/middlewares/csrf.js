const csurf = require('csurf');

const csrfProtection = csurf({
    cookie: true,
    value: req => req.headers['x-csrf-token']
});

module.exports = csrfProtection;