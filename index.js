//const baseUrl = "https://myressourcem.azurewebsites.net/api/carshare"
// const carRidesUrl = "https://localhost:44343/Api/CarRides"
// const carUrl = "https://localhost:44343/Api/Cars"
// const accountUrl = "https://localhost:44343/Api/Accounts"
const baseUrl = "https://mitlift.azurewebsites.net/Api/CarShare"
const testLoginUrl = "https://localhost:44343/Api/CarShare"


const home = Vue.createApp({
    data() {
        return {
            carrideArray: [],
            filteredData: [],
            addData: { carRideId: 0, driveDate: "", startDestination: "", endDestination: "", price: 0, availableSeats: 0, isFull: false, cars: null },
            error: null,
            // filter: [],

            accountArray: [],
            getAccountData: "",
            getMessage: "",

            cars: [],
            carId: "",
            addMessage: "",
            deleteMessage: "",

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
        this.getAllRides()
        this.getAllAccounts()
    },
    methods: {
        //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
        async getAllCarRidesHelper(url) {
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.carrideArray = result.data
                console.log(this.accountArray)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message)
            }
        },
        async getAllAccountsHelper(url) {
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.accountArray = result.data
                console.log(this.carrideArray)
                //console.writeline udskriver til konsollen
            } catch (ex) {//exception
                alert(ex.message)
            }
        },
        async getAllCarsHelper(url) {
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.cars = result.data
                console.log(this.cars)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message)
            }
        },
        //GET ALL METODER
        getAllRides() {
            console.log("Getting the car ride get method")
            this.getAllCarRidesHelper(baseUrl + "/CarRides")
        },
        getAllAccounts() {
            console.log("Getting the account get method")
            this.getAllAccountsHelper(baseUrl + "/Accounts")
        },

        //GET BY ID METODER
        async getAccountsId() {
            const url = baseUrl + this.accountId
            try {
                const response = await axios.get(url)
                this.getAccountData = response.data //her bliver getAccountData fyldt ud med data
                this.getMessage = response.status + " " + response.statusText
                console.log("Get the FK accountId")
            } catch (ex) {
                alert(ex.message)
            }
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

        async deleteCarRide(deleteId) {
            const url = baseUrl + "/CarRides/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllRides()
            } catch (ex) {
                alert(ex.message)
            }
        },


        // async Filter() {
        //     this.carrideArray.filter((c) => c.startDestination == this.filter)
            
        // },

        logud() {
            axios.post(baseUrl + "/Signout")
                .then(result => location.href = "/Pages/login.html")
                .catch(error => console.error(error))
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

        async add() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async FilteredGetAllCarRides(startDestination, endDestination){
            if(startDestination != undefined && endDestination == undefined){
                newUrl = baseUrl + "/CarRides?" + ("startdestination=" + startDestination)
                const response = await axios.get(newUrl)  
                console.log(newUrl, "startdestination only")
                this.cars = await response.data
            } else if(startDestination == undefined && endDestination != undefined){
                const newUrl = baseUrl + "/CarRides?" + ("enddestination=" + endDestination)
                const response = await axios.get(newUrl)
                console.log(newUrl + "enddestination only")
                this.cars = await response.data
            } else if (startDestination != undefined && endDestination != undefined){
                const newUrl = baseUrl + "/CarRides?" + ("startdestination=" + startDestination + "&" + "enddestination=" + endDestination)
                const response = await axios.get(newUrl)
                console.log(newUrl + " start and enddestination")
                this.cars = await response.data
            } else{
            const response = await axios.get(baseUrl+"/CarRides")
            this.cars = await response.data
            }
        }

    }
})
home.mount("#app")