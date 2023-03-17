// const carRidesUrl = "https://localhost:44343/Api/CarRides"
// const carUrl = "https://localhost:44343/Api/Cars"
// const accountUrl = "https://localhost:44343/Api/Accounts"
const baseUrl = "https://apiformitlift69.azurewebsites.net/Api/CarShare"


const betaling = Vue.createApp({
    name: '#betaling',
    data() {
        return {
            cars: [],
            addMessage: "",
            deleteMessage: "",
        }
    },
    created() { // life cycle method. Called when browser reloads page
        this.getAllCars()
    },
    methods: {
       //istedet for at genskrive koden, gør jeg den mere dry ved at lave en helper
     
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
        getAllCars(){
            console.log("Getting the car get method")
            this.getAllCarsHelper(baseUrl+"/Cars")
        },
       
        async deleteCar(deleteId) {
            const url = baseUrl + "/Cars/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllCars()
            } catch (ex) {
                alert(ex.message)
            }
        },

        //GET BY ID METODER
    }
})
betaling.mount('#betaling')