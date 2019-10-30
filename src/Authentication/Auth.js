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
          fetch("/api/authentication/authenticateprocess" , {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then((res) => {
              return res.text();
            }).then((body) => {
              if (body !== "error") {
                 fetch('/api/authentication/login/' + body)
                 .then((res) => {
                   return  res.json();
                 }).then((response) => {
                  this.a = true;
                  this.currentUser = response;
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
            fetch('/api/authentication/logout/' + this.currentUser.userid , {
              method: 'PUT',
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
            /*
            status: false,
      reader(value) {
        value = this.status;
        console.log(value);
      },
      checkStatus(callback) {
        callback = this.reader
      },
      get state() {
        this.reader(this.status)
        return this.status;
      },
      set state(val) {
        this.status = val;
        this.reader(val)
      },
      signIn(username, password) {
        new Promise((resolve , reject) => {
          const data = {
            username: username,
            password: password
        }
        fetch("/api/authentication/loginuser" , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            return res.json();
          }).then((body) => {
            if (body !== "error") {
               currentAUTH = body
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
      Logout() {
        return new Promise((resolve, reject) => {
          if (currentAUTH.authenticated === true) {
           currentAUTH = null;
          } else {
            reject("JPI Error: You are already logged out")
          }
        })
      }
            */
    }


  


/*
const JPILogin = (username, password) => {
         
  }
*/