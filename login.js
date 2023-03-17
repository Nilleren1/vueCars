const baseUrl = "https://apiformitlift69.azurewebsites.net/Api/CarShare"
const testLoginUrl = "https://localhost:44343/Api/CarShare"

const login = Vue.createApp({
    data() {
        return {
            accountArray: [],
            getAccountData: "",
            getMessage: "",
            addMessage: "",
            deleteMessage: "",
            accountId: 0,

            addData: {
                accountId: 0,
                userName: "",
                dateOfBirth: "",
                userAddress: "",
                phone:"",
                email:""
              },
        }
    },
    created() { // life cycle method. Called when browser reloads page
        this.getAllAccounts()
    },
    methods: {
       //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
        async getAllAccountsHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.accountArray= result.data
                console.log(this.accountArray)
                //console.writeline udskriver til konsollen
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
       
        //GET ALL METODER
        getAllAccounts(){
            console.log("Getting the account method")
            this.getAllAccountsHelper(baseUrl + "/Accounts")
        },
        async getLogin(){
            try {//fejl håndtering 
                const result = await axios.get(baseUrl + "/Login")
                this.email= result.data
                console.log(this.email)
            } catch (ex) { //exception
                alert(ex.message) 
            }
        },
        //POST METODER
        postLogin(){
            let bodyFormData = new FormData();
            bodyFormData.append('email', this.addData.email);
            //bodyFormData.append('userName', this.addData.userName);
            axios({
                method: "post",
                url: baseUrl + "/Login",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                    location.href="/Pages/betaling.html"
                  //handle success
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.error(response);
                });
        },
    }
})
login.mount("#login")