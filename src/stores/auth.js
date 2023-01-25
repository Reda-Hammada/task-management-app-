import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    Success: "",
    Error: "",
    authenticateError: "",
  }),
  actions: {
    async register(userCred) {
      await axios
        .post("http://127.0.0.1:8000/api/register", userCred)
        .then(async (res) => {
          const userData = await res.data.user;
          console.log(userData)
          localStorage.setItem("userData", JSON.stringify(userData));
          this.Success = await res.data.message;
          const userToken = await res.data.token;
          localStorage.setItem("user_token", userToken);
          this.$router.push({ name: "Dashboard" });
        })
        .then((err) => {
          console.log(err);
        });
    },
    async authenticate(values) {
      
      await axios
        .post("http://127.0.0.1:8000/api/Login", values)

        .then(async (res) => {

          const userData = await res.data.user;
          localStorage.setItem("userData", userData);
          this.message = res.data.message;
          const token = res.data.token;
          localStorage.setItem("user_token", token);
          this.$router.push({ name: "Dashboard" });

        })
        .catch((err) => {

          if(err){

            this.authenticateError = "The credentials you provided are wrong";
          }
        });
    },
    logout(){
       localStorage.removeItem('user_token')
       localStorage.removeItem('userData')
       this.$router.push({name: 'Home'})
    }
  },
});
