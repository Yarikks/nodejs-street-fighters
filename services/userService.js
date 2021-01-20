const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    getAll() {
        const items = UserRepository.getAll();
        if(!items){
            throw Error('List of users is empty.');
        }
        return items;
    }

    getOne(id) {
        const item = UserRepository.getOne({ id });
        if(!item){
            throw Error('User doesn\'t exist.');
        }
        return item;
    }

    create(user){
        const item = UserRepository.create(user);
        if(!item){
            throw Error('User wasn\'t successfully created.');
        }
        return item;
    }

    update(id, user){
        const item = UserRepository.update(id, user);
        if(!item.id){
            throw Error(`There isn't any user with id ${id} to update.`);
        }
        return item;
    }

    delete(id){
        const item = UserRepository.delete(id);
        if(!item.length){
            throw Error(`There isn't any user with id ${id} to delete.`);
        }
        return item;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();