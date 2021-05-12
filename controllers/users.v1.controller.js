const { User } = require('../models/user.v1.model');
const { extend } = require('lodash');

const createNewUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await User.findOne({ email: userData.email });

        if (user) {
            res.status(409).json({
                success: false,
                message: 'Account already exists for this email',
            });
            return;
        }

        const NewUser = new User(userData);
        const addedUserData = await NewUser.save();

        res.status(201).json({
            success: true,
            response: {
                firstname: addedUserData.firstname,
                userId: addedUserData._id,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const checkAuthentication = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Email is incorrect !',
            });
            return;
        } else if (user.password === password) {
            res.status(200).json({
                success: true,
                response: { firstname: user.firstname, userId: user._id },
            });
            return;
        }
        res.status(401).json({
            success: false,
            message: 'Password is incorrect !',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const getUserByEmail = async (req, res, next, id) => {
    const user = await User.findOne({ email: id });

    if (!user) {
        res.status(404).json({
            success: false,
            message: 'Email does not exist !',
        });
        return;
    }
    req.user = user;
    next();
};

const updateUserDetails = async (req, res) => {
    try {
        let { user } = req;

        const userUpdates = req.body;

        user = extend(user, userUpdates);

        user = await user.save();
        res.status(200).json({
            success: true,
            response: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                userId: user._id,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const user = await User.findById({ _id: userId });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Email does not exist !',
            });
            return;
        }

        res.status(200).json({
            success: true,
            response: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                userId: user._id,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

module.exports = {
    createNewUser,
    checkAuthentication,
    getUserByEmail,
    updateUserDetails,
    getUserById,
};
