const express = require('express');
const router = express.Router();

const {
    createNewUser,
    checkAuthentication,
    getUserByEmail,
    getUserById,
    updateUserDetails,
} = require('../controllers/users.v1.controller');

router.route('/signup').post(createNewUser);

router.route('/login').post(checkAuthentication);

router.param('email', getUserByEmail);

router.route('/:email').post(updateUserDetails);

router.route('/:userId').get(getUserById);

module.exports = router;
