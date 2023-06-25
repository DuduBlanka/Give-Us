const mongoose = require('mongoose');

//const { validate } = require('./validate');

const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    /* resetPasswordToken: {
        type: String,
        required: false,
    } */
});

const UserModal = mongoose.model("Users", UserSchema);
module.exports = UserModal;

/* 
const validate = (Users) => {
    const schema = Joi.object({
        name: Joi.string().name().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().phone().required(),
        address: Joi.string().address().required(),
        city: Joi.string().city().required(),
        password: Joi.string().password().required(),
        type: Joi.string().type().required(),
        //resetPasswordToken: Joi.string().required(),
    });
    console.log("userschema: ", userSchema.validate({}));

    return schema.validate(Users);
};


//module.exports = validate;
module.exports = UserModal, {validate}; */
