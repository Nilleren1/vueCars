const baseUrl = "https://mitlift.azurewebsites.net/Api/CarShare"
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
        //POST METODER
        postLogin(){
            let bodyFormData = new FormData();
            bodyFormData.append('email', this.addData.email);
            //bodyFormData.append('userName', this.addData.userName);
            axios({
                method: "post",
                url: baseUrl,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                    location.href="/index.html"
                  //handle success
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.error(response);
                });
        },
        // async deleteAccount(deleteId) {
        //     const url = baseUrl + "/Accounts/" + deleteId
        //     try {
        //         response = await axios.delete(url)
        //         this.deleteMessage = response.status + " " + response.statusText
        //         this.getAllAccounts()
        //     } catch (ex) {
        //         alert(ex.message)
        //     }
        // },
    }
})
login.mount("#login")