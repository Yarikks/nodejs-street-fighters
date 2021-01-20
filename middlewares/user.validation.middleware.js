const { user } = require('../models/user');
const { removeSpaces, allPropsFilled } = require('../helpers/utils');
const userService = require('../services/userService');

const userValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {
        validate(req);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

const validate = (req) => {
    const item = req.body;
    const { email, phoneNumber } = item;
    const id = req.params.id ? req.params.id : "";

    if(!allPropsFilled(item, user)) {
        throw Error('Not all or extra fields are filled.');
    }
    if (isUsed({ email }, id)) {
        throw Error('This email is already in use.');
    }
    if (isUsed({ phoneNumber }, id)) {
        throw Error('This phone number is already in use.');
    }
    if (!isValidName(item)) {
        throw Error('First and last names cannot be empty.');
    }
    if (!isValidEmail(item)) {
        throw Error('Email domain must ends with gmail.com and be in format: *name*@*domain*.');
    }
    if (!isValidPhone(item)) {
        throw Error('Phone number format should be: +380xxxxxxxxx.');
    }
    if (!isValidPassword(item)) {
        throw Error('Password must have more than 2 symbols');
    }
}

const isUsed = (search, id) => {
    const item = userService.search(search);
    if (!item) {
        return false;
    }
    const isAnotherPerson = !(id === item.id);
    return isAnotherPerson;
}

const isValidName = ({ firstName, lastName }) => {
    firstName = removeSpaces(firstName);
    lastName = removeSpaces(lastName);
    return (firstName.length > 0 && lastName.length > 0);
}

const isValidEmail = ({ email }) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = removeSpaces(email);
    return (emailRegex.test(String(email).toLowerCase()) && email.endsWith('gmail.com'));
}

const isValidPhone = ({ phoneNumber }) => {
    const phoneRegex = /^\+380\d{9}$/;
    phoneNumber = removeSpaces(phoneNumber);
    return phoneRegex.test(phoneNumber);
}

const isValidPassword = ({ password }) => {
    password = removeSpaces(password);
    return password.length >= 2;
}

exports.userValid = userValid;