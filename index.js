//const baseUrl = "https://myressourcem.azurewebsites.net/api/carshare"
// const carRidesUrl = "https://localhost:44343/Api/CarRides"
// const carUrl = "https://localhost:44343/Api/Cars"
// const accountUrl = "https://localhost:44343/Api/Accounts"
const baseUrl = "https://apiformitlift69.azurewebsites.net/Api/CarShare"
const testLoginUrl = "https://localhost:44343/Api/CarShare"


const home = Vue.createApp({
    data() {
        return {
            carrideArray: [],
            filteredData: [],
            addData: { carRideId: 0, driveDate: "", startDestination: "", endDestination: "", price: 0, availableSeats: 0, isFull: false, cars: null },
            error: null,
            // filter: [],
            carRideId: 0,

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
        
        // //Get URL parameters in JS, can be used to get passed values from URL
        // //window.location obj. can be used to get the current page address (URL) and to redirect the browser to a new page.
        // console.log("Window location:", window.location)
        // //myKeyValues bliver sat til window.location.search, search er, som er key/value "?id=1"
        // const myKeyValues = window.location.search;
        // console.log("Key and values:", myKeyValues)
        // //URLSearchParams defines utility methods to work with the query string of a URL.
        // const urlParams = new URLSearchParams(myKeyValues);
        // //id is a parameter we get, get will return the first value, associated with the, given parameter, there are other methods for urlsearchparams
        // const param1 = urlParams.get('id');
        // console.log("Id in url:", param1)

        //window.location obj. can be used to get the current page 
        //address (URL) and to redirect the browser to a new page.
        // substring() method returns the part of the string from the start index 
        //up to and excluding the end index, or to the end of 
        //the string if no end index is supplied.
        // let uri = window.location.search.substring(1);
        // let urlParameters = new URLSearchParams(uri);
        // this.id = urlParameters.get('id')
        // console.log("Er den her? " + this.id);
        //created, kalder dem, istedet for this.id, så 
        //let uri = window.location.search.substring(1);        
        //let urlParameters = new URLSearchParams(uri);        
        //let id = urlParameters.get('id')        
        //helperGetCarDetalje(id)
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

        //REDIRCT TIL DETALJE SIDEN
        redirectToDetalje(carRideId){
            location.href="/Pages/detalje.html?id=" + carRideId
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

        SortByPrice() {
            this.carrideArray.sort((data1, data2) => data1.price - data2.price)
        },
        SortByPriceDesc() {
            this.carrideArray.sort((data1, data2) => data2.price - data1.price)
        },

        async FilteredGetAllCarRides(startDestination, endDestination){
            if(startDestination != undefined && endDestination == undefined){
                newUrl = baseUrl + "/CarRides?" + ("startdestination=" + startDestination)
                const response = await axios.get(newUrl)  
                console.log(newUrl, "startdestination only")
                this.carrideArray = await response.data
            } else if(startDestination == undefined && endDestination != undefined){
                const newUrl = baseUrl + "/CarRides?" + ("enddestination=" + endDestination)
                const response = await axios.get(newUrl)
                console.log(newUrl + "enddestination only")
                this.carrideArray = await response.data
            } else if (startDestination != undefined && endDestination != undefined){
                const newUrl = baseUrl + "/CarRides?" + ("startdestination=" + startDestination + "&" + "enddestination=" + endDestination)
                const response = await axios.get(newUrl)
                console.log(newUrl + " start and enddestination")
                this.carrideArray = await response.data
            } else{
            const response = await axios.get(baseUrl+"/CarRides")
            this.carrideArray = await response.data
            }
        },

        parseDate(time) {
            clock = time.slice(11, 16)
            month = time.slice(5, 7)
            date = time.slice(8, 10)
            year = time.slice(0, 4)
            convertedDate = date + "-" + month + "-" + year + " / " + clock
            //console.log("Converted date to:" + convertedDate)
            return convertedDate
        },
        // parseTime(time) {
        //     convertedDate = time.slice(11, 16)
        //     //console.log("Converted date to:" + convertedDate)
        //     return convertedDate
        // },

    }
})
home.mount("#app")