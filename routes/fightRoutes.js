const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { fightValid } = require('../middlewares/fight.validation.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get('/', (req, res, next) => {
    try{
        const data = FightService.getAll();
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        const data = FightService.getOne(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', fightValid, (req, res, next) => {
    try{
        const fightData = req.body;
        const data = FightService.create(fightData);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', fightValid, (req, res, next) => {
    try{
        const fightId = req.params.id;
        const fightData = req.body;
        const data = FightService.update(fightId, fightData);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        const data = FightService.delete(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;