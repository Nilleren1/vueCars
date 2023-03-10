const baseUrl = "https://apiformitlift69.azurewebsites.net/Api/CarShare"

const createAccount = Vue.createApp({
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
             //Car - egne biler
              cars: [],
              carId: "",
              carData: {
                accountId: 0,
                brand: "",
                model: "",
                fuelType: ""
              },
              //CarRides - egne bookninger
              carArray: [],
              error: null,
              addCarRide: {
                carRideId: 0,
                driveDate: "",
                startDestination: "",
                endDestination: "",
                price: 0,
                availableSeats: 0,
                isFull: false,
              },
        }
    },
    created() { // life cycle method. Called when browser reloads page
        this.getAllAccounts()
        this.getAllCars()
        this.getAllRides()


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
       
        //GET ALL METODER
        getAllAccounts(){
            console.log("Getting the account get method")
            this.getAllAccountsHelper(baseUrl + "/Accounts")
        },
         getAllCars(){
            console.log("Getting the car get method")
            this.getAllCarsHelper(baseUrl+"/Cars")
        },
        getAllRides(){
            console.log("Getting the car ride get method")
            this.getAllCarRidesHelper(baseUrl+"/CarRides")
        },
        //POST METODER
        async postAccount(){
            try{
                response = await axios.post(baseUrl + "/Accounts", this.addData)
                this.addMessage="Response: " + response.status + " " + response.statusText
                if (response.status == 200) {
                    location.href="/Pages/mineKonto.html"
                }
                else{
                    alert("Der er noget galt her " + response.status)
                }
                
            }catch(ex){
                alert(ex.message)
            }
        },
        async deleteAccount(deleteId) {
            const url = baseUrl + "/Accounts/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllAccounts()
            } catch (ex) {
                alert(ex.message)
            }
        },
    }
})
createAccount.mount("#createAccount")