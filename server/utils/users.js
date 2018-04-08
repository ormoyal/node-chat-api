

class Users{
    constructor(){
        this.users = [];
    }
    addUser (id,name,room){
        var user = {id,name,room}
        this.users.push(user);
        return user;
    }

    removeUser(id){
      var user = this.users.filter((user) => {
            return user.id === id
      })[0];

      if(user){
        this.users = this.users.filter(user => user.id !== id)
      };
      return user;
    }

    getUser(id){
        return this.users.filter(user => user.id === id)[0];
    }

    getUsersList(room){
        var users = this.users.filter((user) => {
            return user.room === room
        });
        var usersNames = users.map(user => user.name);
        return usersNames;
    }


}

module.exports = {
    Users
}


// class Users{
//     constructor(id,name,room){
//         this.id = id;
//         this.name = name;
//         this.room = room;
//     }
//
//
//
//
// }


// class Person {
//     constructor(name,age){
//         this.name = name;
//         age = age;
//         console.log(age);
//     }
// }
//
//
// var or = new Person('or',21);
// var dor = new Person('dor',261);
//
// console.log(or ,dor );