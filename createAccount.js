const baseUrl = "https://mitlift.azurewebsites.net/Api/CarShare"

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
                console.log(this.accountArray)
                //console.writeline udskriver til konsollen
            } catch (ex) {//exception
                alert(ex.message) 
            }
        },
       
        //GET ALL METODER
        getAllAccounts(){
            console.log("Getting the account get method")
            this.getAllAccountsHelper(baseUrl + "/Accounts")
        },
        //POST METODER
        async postAccount(){
            try{
                response = await axios.post(baseUrl + "/Accounts", this.addData)
                this.addMessage="Response: " + response.status + " " + response.statusText
                if (response.status == 200) {
                    location.href="/Pages/mineKontoOplysninger.html"
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