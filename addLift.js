const baseUrl = "https://mitlift.azurewebsites.net/Api"

const addLift = Vue.createApp({
    name: '#addLift',
    data() {
        return {
            lifts: [],
            liftId: "",
            addMessage: "",

            addData: {
                carId: 0,
                driveDate: "",
                startDestination: "",
                endDestination: "",
                price: 0,
                availableSeats: 0,
                isFull: false,
              },
              carArray: [],
        }
    },
    created() { // life cycle method. Called when browser reloads page
       
        this.getAllCarRides()
        this.getAllCars()
    },
    methods: {
       //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
     
        async getAllCarRidesHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.lifts = result.data
                console.log(this.lifts)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
        async getAllCarsHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.carArray= result.data
                console.log(this.carArray)
                //console.writeline udskriver til konsollen
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
        //GET ALL METODER
        getAllCars(){
            console.log("Getting the car get method")
            this.getAllCarsHelper(baseUrl + "/Cars")
        },
        getAllCarRides(){
            console.log("Getting the carrides get method")
            this.getAllCarRidesHelper(baseUrl + "/CarRides")
        },

         //GET BY ID METODER
         async postCarRides(){
            try{
                response = await axios.post(baseUrl + "/CarRides", this.addData)
                this.addMessage="Response: " + response.status + " " + response.statusText
                if (response.status == 204 || response.status == 200) {
                    location.href="/index.html"
                }
                else{
                    alert("Der er noget galt her " + response.status)
                }
                
            }catch(ex){
                alert(ex.message)
            }
        },
    }
})
addLift.mount('#addLift')