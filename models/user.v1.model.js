const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstname: { type: String, required: 'first name is required' },
        lastname: { type: String, required: 'last name is required' },
        email: {
            type: String,
            unique: 'Account already exists for this email',
            required: 'Email id is required',
            validate: {
                validator: function (value) {
                    return /^.+@.+\.com$/.test(value);
                },
                message: (props) => `${props.value} is not a valid email`,
            },
        },

        password: {
            type: String,
            required: 'Password is required',
            validate: {
                validator: function (value) {
                    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
                        value,
                    );
                },
                message: (props) =>
                    `Password should contain 8 letters(atleast one number, one smallcase and uppercase alphabets)`,
            },
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
