
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
//   import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHNSqnVGcVcqbxt8Txr_GEENvJt0xrquE",
    authDomain: "corolab-85035.firebaseapp.com",
    projectId: "corolab-85035",
    storageBucket: "corolab-85035.appspot.com",
    messagingSenderId: "1061073566681",
    appId: "1:1061073566681:web:0bd8305893070ab950b7c8",
    measurementId: "G-ZDFLMRKENT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Variables
const auth = firebase.auth()

//set up register function
function register() {
    //Get all our input fields
    username = document.getElementById('username')
    email = document.getElementById('email')
    password = document.getElementById('password')
    phone = document.getElementById('phone')
    dateOfBirth = document.getElementById('dateOfBirth')
    userAddress = document.getElementById('userAddress')

    //validate input fields
    if (validateEmail(email) == false || validatePassword(password) == false) {
        alert('Some requirements are not met.')
        return
        //dont run the code
    }

    //Move on with auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser

        //Add this user to our database
        // var databaseRef = database.ref()

        //Create user data
        var userData = {
            username : username,
            email : email,
            password : password,
            phone : phone,
            dateOfBirth : dateOfBirth,
            userAddress : userAddress,
            lastLogin: Date.now()
        }

        // databaseRef.child('users/' + user.uid).set(userData)

        alert('User Created')
    })
    .catch(function(error){
        //firebase will use this to alert the errors
        var errorCode = error.code
        var errorMessage = error.message

        alert(errorMessage)
    })
}

function validateEmail(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        //Email is good
        return true
    } else {
        //email is bad
        return false
    }
}

function validatePassword(password) {
    //Firebase only accepts lengths that is greater or equal to 6
    if(password < 6){
        return false
    } else {
        return true
    }
}

function validateField(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else{
        return true
    }
}
