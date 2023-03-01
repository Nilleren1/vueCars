//const baseUrl = "https://myressourcem.azurewebsites.net/api/carshare"
// const carRidesUrl = "https://localhost:44343/Api/CarRides"
// const carUrl = "https://localhost:44343/Api/Cars"
// const accountUrl = "https://localhost:44343/Api/Accounts"
const baseUrl = "https://mitlift.azurewebsites.net/Api"

const logIn = Vue.createApp({
    data() {
        return {
            accountArray: [],
            getAccountData: "",
            getMessage: "",
            accountId: 0,

           

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
                console.log(this.carArray)
                //console.writeline udskriver til konsollen
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
       
        //GET ALL METODER
        getAllAccounts(){
            console.log("Getting the account get method")
            this.getAllAccountsHelper(baseUrl+"/Accounts")
        },
    }
})
logIn.mount("#logIn")