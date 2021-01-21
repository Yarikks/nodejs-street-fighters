const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights
    getAll() {
        const items = FightRepository.getAll();
        if(!items){
            throw Error('List of fights is empty.');
        }
        return items;
    }

    getOne(id) {
        const item = FightRepository.getOne({id});
        if(!item){
            throw Error('Fight doesn\'t exist.');
        }
        return item;
    }

    create(fight) {
        const item = FightRepository.create(fight);
        if(!item){
            throw Error('Fight wasn\'t successfully created.');
        }
        return item;
    }

    update(id, fight) {
        const item = FightRepository.update(id, fight);
        if(!item.id){
            throw Error(`There isn't any fight with id ${id} to update.`);
        }
        return item;
    }

    delete(id) {
        const item = FightRepository.delete(id);
        if(!item.length){
            throw Error(`There isn't any fight with id ${id} to delete.`);
        }
        return item;
    }

    search(search) {
        const item = FightRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FightersService();