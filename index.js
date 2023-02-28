//const baseUrl = "https://myressourcem.azurewebsites.net/api/carshare"
// const carRidesUrl = "https://localhost:44343/Api/CarRides"
// const carUrl = "https://localhost:44343/Api/Cars"
// const accountUrl = "https://localhost:44343/Api/Accounts"
const baseUrl = "https://mitlift.azurewebsites.net/Api"

const home = Vue.createApp({
    data() {
        return {
            carArray: [],
            error: null,
            
            accountArray: [],
            getAccountData: "",
            getMessage: "",
            accountId: 0,

            cars: [],
            carId: "",
            addMessage: "",

           

        }
    },
    created() { // life cycle method. Called when browser reloads page
        this.getAllRides()
        this.getAllAccounts()
    },
    methods: {
       //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
        async getAllCarRidesHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.carArray= result.data
                console.log(this.carArray)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
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
        async getAllCarsHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.cars= result.data
                console.log(this.cars)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
        //GET ALL METODER
        getAllRides(){
            console.log("Getting the car ride get method")
            this.getAllCarRidesHelper(baseUrl+"/CarRides")
        },
        getAllAccounts(){
            console.log("Getting the account get method")
            this.getAllAccountsHelper(baseUrl+"/Accounts")
        },

        //GET BY ID METODER
        async getAccountsId(){
            const url = baseUrl + this.accountId
            try{
                const response = await axios.get(url)
                this.getAccountData = response.data //her bliver getAccountData fyldt ud med data
                this.getMessage = response.status + " " + response.statusText
                console.log("Get the FK accountId")
            }catch(ex){
                alert(ex.message) 
            }
        },

        //POST METODER


        // async postCar(){
        //     try{
        //         response = await axios.post(carUrl, this.addData)
        //         this.addMessage="Response: " + response.status + " " + response.statusText
        //         this.getAllCars()
        //     }catch(ex){
        //         alert(ex.message)
        //     }
        // },

    }
})
home.mount("#app")