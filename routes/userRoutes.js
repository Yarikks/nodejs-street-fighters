const { Router } = require('express');
const UserService = require('../services/userService');
const { userValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res, next) => {
    try {
        const data = UserService.getAll();
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const data = UserService.getOne(id);
        res.data = data;
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', userValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }

    try {
        const userData = req.body;
        const data = UserService.create(userData);
        res.data = data;
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', userValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }
    try {
        const userId = req.params.id;
        const userData = req.body;
        const data = UserService.update(userId, userData);
        res.data = data;
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const data = UserService.delete(id);
        res.data = data;
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;