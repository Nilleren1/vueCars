const baseUrl = "https://myressourcem.azurewebsites.net/api/carshare"

Vue.createApp({
    data() {
        return {
            carArray: [],
            error: null,
            carId: ""
        }
    },
    created() { // life cycle method. Called when browser reloads page
        this.getAllCars()
    },
    methods: {
        async getAllCarsHelper(url){
            try {//fejl håndtering 
                const result = await axios.get(url)
                this.carArray= result.data
                console.log(this.carArray)
                //console.writeline udskriver nogle
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
        getAllCars(){
            console.log("Getting the get method")
            this.getAllCarsHelper(baseUrl)
            //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
        },
        
        cleanList() {
            this.carArray = []
            this.error = null
        },
    }
}).mount("#app")