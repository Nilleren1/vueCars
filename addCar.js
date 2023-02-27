const carRidesUrl = "https://localhost:44343/Api/CarRides"
const carUrl = "https://localhost:44343/Api/Cars"
const accountUrl = "https://localhost:44343/Api/Accounts"

const addCar = Vue.createApp({
    name: '#addCar',
    data() {
        return {
            cars: [],
            carId: "",
            addMessage: "",

            addData: {
                accountId: 0,
                brand: "",
                model: "",
                fuelType: ""
              },
              foobar: null,
              accountArray: [],

    
        }
    },
    created() { // life cycle method. Called when browser reloads page
       
        this.getAllCars()
        this.getAllAccounts()
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
        getAllCars(){
            console.log("Getting the car get method")
            this.getAllCarsHelper(carUrl)
        },
        getAllAccounts(){
            console.log("Getting the account get method")
            this.getAllAccountsHelper(accountUrl)
        },

        //GET BY ID METODER
          async postCar(){
            try{
                response = await axios.post(carUrl, this.addData)
                this.addMessage="Response: " + response.status + " " + response.statusText
                if (response.status == 200) {
                    location.href="/index.html"
                }
                else{
                    alert("Der er noget galt her " + response.status)
                }
                
            }catch(ex){
                alert(ex.message)
            }
        },
        //submit(){
        //     this.$router.push("/index.html")
        //   }
    }
})
addCar.mount('#addCar')