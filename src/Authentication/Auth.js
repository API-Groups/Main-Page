     import axios from 'axios';
     export const JPIAuth = {
        aInternal: false,
        currentUserInternal: '',
        aListener: function(val) {},
        set currentUser(val) {
          this.currentUserInternal = val;
        },
        get currentUser() {
          return this.currentUserInternal;
        },
        set a(val) {
          this.aInternal = val;
          this.aListener(val);
        },
        get a() {
          return this.aInternal;
        },
        registerListener: function(listener) {
          this.aListener = listener;
        },
        signIn(username , password) {
         return new Promise((resolve , reject) => {
            const data = {
              username: username,
              password: password
          }
          axios.post("https://jpi-backend.herokuapp.com/api/authentication/authenticateprocess" , data,{
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            }).then((body) => {
              console.log(body)
              if (body.data !== "error") {
                 axios.get('https://jpi-backend.herokuapp.com/api/authentication/login/' + body.data)
                 .then((response) => {
                  this.a = true;
                  this.currentUser = response.data;
                 }).catch((error) => {
                   console.log(error);
                 })
                 resolve(true);
              } else {
                  reject("error: there was an error in the authentication")
              }
            })
            .catch((error) => {
              console.log(error);
            })
          })
        },
        logout() {
          return new Promise((resolve , reject) => {
            axios.put('https://jpi-backend.herokuapp.com/api/authentication/logout/' + this.currentUser.userid , {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then(() => {
              this.a = false;
              this.currentUser = "";
              resolve("user logged out");
            }).catch((error) => {
              console.log(error)
              reject(error)
            })
          })
        }
    }