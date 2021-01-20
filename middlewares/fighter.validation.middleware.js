const { removeSpaces, allPropsFilled } = require('../helpers/utils');
const { fighter } = require('../models/fighter');
const fighterService = require('../services/fighterService');

const fighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
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
    const { name } = item;
    const id = req.params.id ? req.params.id : "";

    if (isUsed({ name }, id)) {
        throw Error('This name is already in use.');
    }
    if (!allPropsFilled(item, fighter)) {
        throw Error('Not all or extra fields are filled.');
    }
    if (!isValidName(item)) {
        throw Error('Name field cannot be empty.');
    }
    if (!isValidHealth(item)) {
        throw Error('Health must be a number and be in range from 1 to 100');
    }
    if (!isValidPower(item)) {
        throw Error('Power must be a number and be in range from 1 to 100');
    }
    if (!isValidDefense(item)) {
        throw Error('Defense must be a number and be in range from 1 to 10');
    }
}

const isUsed = (search, id) => {
    const item = fighterService.search(search);
    if (!item) {
        return false;
    }
    const isAnotherPerson = !(id === item.id);
    return isAnotherPerson;
}

const isValidName = ({ name }) => {
    name = removeSpaces(name);
    return (name.length > 0)
}

const isValidHealth = ({ health }) => {
    if (!health || (health < 1 || health > 100) || typeof health !== 'number') {
        return false;
    }
    return true;
}

const isValidPower = ({ power }) => {
    if (!power || (power < 1 || power > 100) || typeof power !== 'number') {
        return false;
    }
    return true;
}

const isValidDefense = ({ defense }) => {
    defense = Number(defense);
    if (!defense || (defense < 1 || defense > 10)) {
        return false;
    }
    return true;
}

exports.fighterValid = fighterValid;