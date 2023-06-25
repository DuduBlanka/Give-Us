//const { rejects } = require("assert");
//const { resolve } = require("path");

 //button
 const registerBtn = document.getElementById("register");
 
const passwordInput = document.getElementById('pwd_id');
const toggleButton = document.getElementById('toggleButton');

// Add event listener to the toggle button
toggleButton.addEventListener('click', function() {
  // Toggle the type attribute of the password input
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = 'Hide';
    toggleButton.src= "../Images/eye-open.png"
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = 'Show';
    toggleButton.src= "../Images/eye-close.png"
  }
});

const repeatPasswordInput= document.getElementById("pwd-repeat_id")
const toggleButtonRepeat = document.getElementById('toggleButtonRepeat');

toggleButtonRepeat.addEventListener('click', function() {
    // Toggle the type attribute of the password input
    if (repeatPasswordInput.type === 'password') {
      repeatPasswordInput.type = 'text';
      toggleButtonRepeat.textContent = 'Hide';
      toggleButtonRepeat.src= "../Images/eye-open.png"
    } else {
      repeatPasswordInput.type = 'password';
      toggleButtonRepeat.textContent = 'Show';
      toggleButtonRepeat.src= "../Images/eye-close.png"
    }
});
// 
registerBtn.addEventListener("click", function() {
  event.preventDefault();

   // Get all form fields
  const fullNameElement = document.getElementById("fullname_id").value.trim();
  const email = document.getElementById("email_id").value.trim();
  const phone = document.getElementById("phoneNumber_id").value.trim();
  const address = document.getElementById("address_id").value.trim();
  const cityElement = document.getElementById("city_id").value.trim();
  const password = document.getElementById("pwd_id").value.trim();
  const type = document.getElementById("type_id").value.trim();

  let fullName = fullNameElement;
  const name = fullName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const tempCity = cityElement;
  const city = tempCity
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let emailAgree = "YES";
  let phoneAgree = "YES";

  if(checkFields()){
    const registrationData = {
      name,
      email,
      phone,
      address,
      city,
      password,
      type
    };
   // console.log(JSON.stringify(registrationData))
  
    // Send POST request to server
  fetch('http://localhost:3001/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Registration response from the server
      // Handle success response, e.g., display a success message
      if (data.message) {
        alert(data.message); // Display the message from the server
      }
      if(data.message === "User already exists"){
        window.location.href = "../General/homePage.html";
        return;
      }
      const registrationData1 = {
        name,
        email,
        phone,
        type,
        emailAgree,
        phoneAgree
      };
      // Send a GET request to the server to update user settings
      fetch('http://localhost:3001/updateNotification', {
        method: 'POST',
        //mode: 'cors', // Add this line
        //mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData1)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Registration response from the server
          // Handle success response, e.g., display a success message
          // Optionally, redirect to a new page
          window.location.href = "../General/homePage.html";
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          //alert("Registration failed. Please try again later.")
        });
          // Optionally, redirect to a new page
          window.location.href = "../General/homePage.html";
        })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      //alert("Registration failed. Please try again later.");
      //window.location.href = "registerNeedy.html";
    });
  }
}); 
//
/* registerBtn.addEventListener("click", function() {
  event.preventDefault();

   // Get all form fields
  const name = document.getElementById("fullname_id").value;
  const email = document.getElementById("email_id").value;
  const phone = document.getElementById("phoneNumber_id").value;
  const address = document.getElementById("address_id").value;
  const city = document.getElementById("city_id").value;
  const password = document.getElementById("pwd_id").value;
  const type = document.getElementById("type_id").value;

  if(checkFields()){
    const registrationData = {
      name,
      email,
      phone,
      address,
      city,
      password,
      type
    };
    console.log('name:', registrationData.name);
    console.log('email:', registrationData.email);
    console.log('phone:', registrationData.phone);
    console.log('address:', registrationData.address);
    console.log('city:', registrationData.city);
    console.log('password:', registrationData.password);
    console.log('type:', registrationData.type);
   // console.log(JSON.stringify(registrationData))
  
    // Send POST request to server
  fetch('http://localhost:3001/createUser', {
    method: 'POST',
    //mode: 'no-cors',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Registration response from the server
      // Handle success response, e.g., display a success message
      if (data.message) {
        alert(data.message); // Display the message from the server
      }
      // Optionally, redirect to a new page
      window.location.href = "../General/homePage.html";
    })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      alert("Registration failed. Please try again later.");
      //window.location.href = "registerNeedy.html";
    });
  }
});  */

// Add event listener to form submit button
function checkFields(){

  // Get all form fields
  const fullName = document.getElementById("fullname_id").value.trim();
  const email = document.getElementById("email_id").value.trim();
  const repeatemail = document.getElementById("repeatemail_id").value.trim();
  const phone = document.getElementById("phoneNumber_id").value.trim();
  const repeatphone = document.getElementById("repeatphonenumber_id").value.trim();
  const addressField = document.getElementById("address_id").value.trim();
  const cityField = document.getElementById("city_id").value.trim();
  const passwordField = document.getElementById("pwd_id").value.trim();
  const repeatPasswordField = document.getElementById("pwd-repeat_id").value.trim();
  
  console.log('Full Name:', fullName);
  console.log('Email:', email);
  console.log('Repeat Email:', repeatemail);
  console.log('Phone Number:', phone);
  console.log('Repeat Phone Number:', repeatphone);
  console.log('Address:', addressField);
  console.log('City:', cityField);
  console.log('Password:', passwordField);
  console.log('Repeat Password:', repeatPasswordField);
  
  var minNumberofChars = 4;
  var maxNumberofChars = 8;

    //console.log(email.value)
    //console.log(passwordField.value)
    
// Define regex patterns for email and phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  //const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{4,8}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$/;

  // Check if all required fields are filled in
  /* if (fullName.value === "" || email.value === "" || repeatemail.value === "" ||
      phone.value === "" || repeatphone.value === "" || addressField.value === "" ||
      cityField.value === "" || passwordField.value === "" || repeatPasswordField.value === "") {
        // Display a warning message
      alert("Please fill in all required fields.");
      return false;
  } */
  console.log(fullName);
  console.log(email);
  console.log(phone);
  console.log(addressField);
  console.log(cityField);
  console.log(passwordField);
   // Check if all required fields are filled in
   if (fullName === "" || email === "" || repeatemail === "" ||
   phone === "" || repeatphone === "" || addressField === "" ||
   cityField === "" || passwordField === "" || repeatPasswordField === "") {
     // Display a warning message
      alert("Please fill in all required fields.");
      return false;
  }
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      //console.log(email.value)
      return false;
  }
  // Check if email and repeat email fields are the same
  if (email !== repeatemail) {
      // Display a warning message
      alert("Emails do not match.");
      return false;
  }
  if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return false;
  }
    // Check if phone number and repeat phone number fields are the same
  if (phone !== repeatphone) {
      // Display a warning message
      alert("Phone numbers do not match.");
      return false;
  }
/*   if(passwordField.value.length < minNumberofChars || passwordField.value.length > maxNumberofChars){
      alert("The password must contain between 4 and 8 characters.")
      return false;
  }
  // Check if password meets criteria
  if (!passwordRegex.test(passwordField.value)) {
      alert("The password must contain at least one letter, one number, one special character! ");
      return false;
  } */
  if (passwordField !== repeatPasswordField) {
    alert("Passwords do not match.");
    return false;
  } 
  return true;  
}


      