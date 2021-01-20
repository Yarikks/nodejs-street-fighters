const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        const items = FighterRepository.getAll();
        if(!items){
            throw Error('List of fighters is empty.');
        }
        return items;
    }

    getOne(id) {
        const item = FighterRepository.getOne({ id });
        if(!item){
            throw Error('Fighter doesn\'t exist.');
        }
        return item;
    }

    create(fighter){
        const item = FighterRepository.create(fighter);
        if(!item){
            throw Error('Fighter wasn\'t successfully created.');
        }
        return item;
    }

    update(id, fighter){
        const item = FighterRepository.update(id, fighter);
        if(!item.id){
            throw Error(`There isn't any fighter with id ${id} to update.`);
        }
        return item;
    }

    delete(id){
        const item = FighterRepository.delete(id);
        if(!item.length){
            throw Error(`There isn't any fighter with id ${id} to delete.`);
        }
        return item;
    }

    search(search){
        const item = FighterRepository.getOne(search);
        if(!item){
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();