const { check } = require('express-validator');

const validation = {
    signupValidation: function () {
        var validation = [
            check('displayName', 'Display name should not be empty.').notEmpty(),
            check('username', 'Username should not be empty.').notEmpty(),
            check('password', 'Password should contain at least 8 characters.').isLength({min: 8}),
            check('password2', 'Password does not match!').equals('password2', 'password')
        ];

        return validation;
    }

};

module.exports = validation;