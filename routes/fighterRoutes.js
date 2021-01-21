const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { fighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', (req, res, next) => {
    try{
        const data = FighterService.getAll();
        res.data = data;
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        const data = FighterService.getOne(id);
        res.data = data;
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', fighterValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }

    try{
        const fighterData = req.body;
        const data = FighterService.create(fighterData);
        res.data = data;
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', fighterValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }
    
    try{
        const fighterId = req.params.id;
        const fighterData = req.body;
        const data = FighterService.update(fighterId, fighterData);
        res.data = data;
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        const data = FighterService.delete(id);
        res.data = data;
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;