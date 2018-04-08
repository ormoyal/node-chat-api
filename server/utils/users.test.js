const expect = require('expect');

const {Users} = require('./users');

var users;
// var userSeed = [{
//     id:'1',
//     name:'or',
//     room:'foo'
// },{
//     id:'2',
//     name:'noy',
//     room:'bar'
// },{
//     id:'3',
//     name:'shlomi',
//     room:'foo'
// }];

var generateUsers = () => {
    users = new Users();

    users.users = [{
        id:'1',
        name:'or',
        room:'foo'
    },{
        id:'2',
        name:'noy',
        room:'bar'
    },{
        id:'3',
        name:'shlomi',
        room:'foo'
    }];


    // userSeed.forEach((user) => {
    //     users.addUser(user.id,user.name,user.room);
    // });
    // return users;
};

beforeEach(() => {
    generateUsers();
});

describe('Users', () => {
    it('should add new user', () => {

        // var users = new Users();
        var user = {
            id:123,
            name:'or',
            room:'or\'s room '
        };

        var resUser = users.addUser(user.id,user.name,user.room);
        // console.log('users.users ',users.users);
        // console.log('resUser ',resUser);

        expect(users.users[3]).toEqual(user);
    });

    it('shloud delete 1 user',() => {
        expect(users.removeUser('2').name).toBe('noy');
    });

    it('shloud NOT delete 1 user',() => {
        expect(users.removeUser('4')).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('shloud return names for foo room',() => {
        var names = users.getUsersList(users.users[0].room);
        expect(names.length).toBe(2);
    });

    it('shloud return names for bar room',() => {
        var names = users.getUsersList('bar');
        expect(names.length).toBe(1);
    });

    it('shloud return 1 user',() => {
        expect(users.getUser('2').id).toBe('2');
    });

    it('shloud NOT return 1 user',() => {
        expect(users.getUser('5')).toBeFalsy();
        expect(users.users.length).toBe(3);

    });

});

