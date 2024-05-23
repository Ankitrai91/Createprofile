angular.module('myApp').factory('UserService', ['$q', function($q) {
    var users = [
      { id: 1, name: 'Ankit Rai',age:24, email: 'ankit@gmail.com',profilePicture: 'https://source.unsplash.com/random/?boy/" alt="crypto"'  },
      { id: 2, name: 'maddy',age:40, email: 'maddy@hotmail.com',profilePicture: 'https://source.unsplash.com/random/?girl/" alt="crypto"'  },
      { id: 2, name: 'kas',age:19, email: 'kas@hotmail.com',profilePicture: 'https://source.unsplash.com/random/?girl/" alt="crypto"'  },
      { id: 2, name: 'sassy',age:20, email: 'sassy@hotmail.com',profilePicture: 'https://source.unsplash.com/random/?girl/" alt="crypto"'  },
    ];
  
    return {
      getUsers: function() {
        return $q.resolve({ data: users });
      },
      addUser: function(user) {
        // user.id = users.length ? Math.max((users.map(u => u.id))) + 1 : 1;
        var maxId = users.length ? Math.max.apply(null, users.map(u => u.id)) : 0;
      user.id = maxId + 1;
        users.unshift(user);
        return $q.resolve();
      },
      updateUser: function(updatedUser) {
        var index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          users[index] = updatedUser;
        }
        return $q.resolve();
      },
      deleteUser: function(id) {
        var index = users.findIndex(u => u.id === id);
        if (index !== -1) {
          users.splice(index, 1);
        }
        return $q.resolve();
      }
    };
  }]);
  