const baseUrl = "https://apiformitlift69.azurewebsites.net/Api/CarShare"
const testLoginUrl = "https://localhost:44343/Api/CarShare"


const detalje = Vue.createApp({
    data() {
        return {
            carride: "",
            //error: null,
            //carRideId: 0,
        }
    },
    created() { // life cycle method. Called when browser reloads page
        
        //window.location obj. can be used to get the current page 
        //address (URL) and to redirect the browser to a new page.
        // substring() method returns the part of the string from the start index 
        //up to and excluding the end index, or to the end of 
        //the string if no end index is supplied.
        let uri = window.location.search.substring(1);
        let urlParameters = new URLSearchParams(uri);
        let id = urlParameters.get('id')
        console.log("ID:" + id)
        this.helperGetCarDetalje(baseUrl, id)
        //created, kalder dem, istedet for this.id, så 
    },
    methods: {
        async helperGetCarDetalje(url, id) {
            try {     //fejl håndtering 
                const result = await axios.get(url + "/CarRides/" + id)
                console.log(url + "/CarRides/" + id)
                this.carride = result.data
                console.log(result)
            } catch (ex) {//exception
                alert(ex.message)
            }
        },
    }
})
detalje.mount("#detalje")