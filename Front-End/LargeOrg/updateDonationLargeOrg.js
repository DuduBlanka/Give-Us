//input fields
const foodTypeInput = document.getElementById('food-type');
const quantityInput = document.getElementById('quantity');
const unitSelect = document.getElementById('chooseunit');

//////////////////////////////////////////////////////////////////////////////
//button button-box
const updateFoodBtn = document.getElementById("updatefood_id");
const refreshPageBtn = document.getElementById("refereshtable-btn_id");
const showContactManBtn = document.getElementById("showcontactman_id");
const backBtn = document.getElementById("backhome");
const updateAssociationBtn = document.getElementById("choosediff_id");
/////////////////////////////////////////////////////////////////////////////////////////
//form 
//const formDisplayDonation = document.getElementById('form-table');
const formDelateDonation = document.getElementById('form-displaydonation');
const formOptionAssociation = document.getElementById('form-optionAssociation');
const formUpdateDonation = document.getElementById('form-updatedonation');
const formReturnHomePage = document.getElementById('form-return');

////////////////////////////////////////////////////////////////////////////////////
//select association
const pickUpAssociation = document.getElementById('associationselect_id');

///////////////////////////////////////////////////////////////////////////////////////
//modal
//const displayDonationModal = document.getElementById('displaydonation_id');
const optionAssociationModal = document.getElementById('optionAssociation_id');
const addFoodDonationModal = document.getElementById('addfooddonation_id');
const confirmDonationModal = document.getElementById('confirmdonation_id');
const showContactManModal = document.getElementById('showcontactmanmodal_id')
const pickupContactManModal = document.getElementById('pickupcontactman_id')
const returnModal = document.getElementById('return_id');

//button displaydonationmodal
// const showItemsDonationBtn = document.getElementById('showitem');
// const chooseAssociationBtn = document.getElementById('choosediff');
//const addFoodBtn = document.getElementById('addfoodtolist');
//const closeAddFoodBtn = document.getElementById('closeaddfood');

//button option associationmodal
const saveAssociationBtn = document.getElementById('chooseassociation');
const closeAssociationBtn = document.getElementById('closechooseassociation');

//button addfooddonationmodal
const addFoodToListBtn = document.getElementById('addfoodtolist');
const showDetailsBtn = document.getElementById('viewitems_id');
const saveUpdateBtn = document.getElementById("saveupdate_id");
const closeaddFoodBtn = document.getElementById('closeaddfood');

//button confirmdonationmodal
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');

//button returnmodal
const returnYesBtn = document.getElementById('return-yes');
const returnNoBtn = document.getElementById('return-no');

//buttons showcontactmanmodal
const changeContactManBtn = document.getElementById("changecontactman_id");
const closechangeContactManBtn = document.getElementById('closecontactman_id');
//buttons pickupcontactman
const saveUpdateContactManBtn = document.getElementById("selectContactMen-yes_id");
const closeUpdateContactManBtn = document.getElementById('selectContactMen-no_id');
//
//viewItemsBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
//deleteBtn.addEventListener('click', () => handleDeleteBtnModalChoice('delete'));

confirmYesBtn.addEventListener('click', () => handleConfirmDonationModalChoice('yes'));
confirmNoBtn.addEventListener('click', () => handleConfirmDonationModalChoice('no'));

returnYesBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoBtn.addEventListener('click', () => handleReturnModalChoice('no'));

///////////////////////////////////////////////////////////////////////////////////////////
//var
let currentNumber = 0;
let currentAssociation = '';
let selectAssociation = null;
let flagopen1 = 0;
let flagopen2 = 0;
let flagUpdateFoodOpen = 0;
let flagUpdateAssociation = 0;
let flagUpdateContactMan = 0;
let surplusFoodItems = [1000];
let tempSurplusFoodItems = [1000];
let surplusFoodReports = [1000];
let tempSurplusFoodReports = [1000];
let tempContactMan = [];
let popupWindows = [];
let popupContent = '';
let popupWindow;
var tempPopup = '';
let booleanArray = [1000];
let tempNumber = [];
const length = 1000; // Number of cells in the array


/****************************************************************************/
// Function to handle mouse down event- optionAssociationModal
let isDraggingOptionAssociation = false;
let dragStartXOptionAssociation = 0;
let dragStartYOptionAssociation = 0;

let isDraggingAddFoodDonation = false;
let dragStartXAddFoodDonation = 0;
let dragStartYAddFoodDonation = 0;

let isDraggingPickupContactMan = false;
let dragStartXPickupContactMan = 0;
let dragStartYPickupContactMan = 0;

// Function to handle mouse down event - optionAssociationModal
function handleMouseDownOptionAssociation(event) {
  isDraggingOptionAssociation = true;
  dragStartXOptionAssociation = event.clientX - optionAssociationModal.offsetLeft;
  dragStartYOptionAssociation = event.clientY - optionAssociationModal.offsetTop;
}

// Function to handle mouse move event - optionAssociationModal
function handleMouseMoveOptionAssociation(event) {
  if (isDraggingOptionAssociation) {
    const newLeft = event.clientX - dragStartXOptionAssociation;
    const newTop = event.clientY - dragStartYOptionAssociation;
    optionAssociationModal.style.left = `${newLeft}px`;
    optionAssociationModal.style.top = `${newTop}px`;
  }
}

// Function to handle mouse down event - addFoodDonationModal
function handleMouseDownAddFoodDonation(event) {
  isDraggingAddFoodDonation = true;
  dragStartXAddFoodDonation = event.clientX - addFoodDonationModal.offsetLeft;
  dragStartYAddFoodDonation = event.clientY - addFoodDonationModal.offsetTop;
}

// Function to handle mouse move event - addFoodDonationModal
function handleMouseMoveAddFoodDonation(event) {
  if (isDraggingAddFoodDonation) {
    const newLeft = event.clientX - dragStartXAddFoodDonation;
    const newTop = event.clientY - dragStartYAddFoodDonation;
    addFoodDonationModal.style.left = `${newLeft}px`;
    addFoodDonationModal.style.top = `${newTop}px`;
  }
}

// Function to handle mouse down event - pickupContactManModal
function handleMouseDownAddFoodDonation(event) {
  isDraggingPickupContactMan = true;
  dragStartXPickupContactMan = event.clientX - pickupContactManModal.offsetLeft;
  dragStartYPickupContactMan = event.clientY - pickupContactManModal.offsetTop;
}

// Function to handle mouse move event - pickupContactManModal
function handleMouseMoveAddFoodDonation(event) {
  if (isDraggingAddFoodDonation) {
    const newLeft = event.clientX - dragStartXPickupContactMan;
    const newTop = event.clientY - dragStartYPickupContactMan;
    pickupContactManModal.style.left = `${newLeft}px`;
    pickupContactManModal.style.top = `${newTop}px`;
  }
}

// Function to handle mouse up event
function handleMouseUp() {
  isDraggingOptionAssociation = false;
  isDraggingAddFoodDonation = false;
  isDraggingPickupContactMan = false;
}

// Add event listeners - optionAssociationModal
optionAssociationModal.addEventListener('mousedown', handleMouseDownOptionAssociation);
document.addEventListener('mousemove', handleMouseMoveOptionAssociation);
document.addEventListener('mouseup', handleMouseUp);

// Add event listeners - addFoodDonationModal
addFoodDonationModal.addEventListener('mousedown', handleMouseDownAddFoodDonation);
document.addEventListener('mousemove', handleMouseMoveAddFoodDonation);
document.addEventListener('mouseup', handleMouseUp);

// Add event listeners - pickupContactManModal
pickupContactManModal.addEventListener('mousedown', handleMouseDownAddFoodDonation);
document.addEventListener('mousemove', handleMouseMoveAddFoodDonation);
document.addEventListener('mouseup', handleMouseUp);


/**********************************************************************************/
//
for (let i = 0; i < length; i++) {
  booleanArray[i] = -1;
  surplusFoodItems[i]= null;
  surplusFoodReports[i] = 0;
}
/////////////////////////////////////////////////////////////////////////////////////
//
function closePopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}
// Reset the checkboxes in the contact man table
function resetContactManCheckboxes() {
  const checkboxes = document.querySelectorAll('#contactManTable input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

////////////////////////////////////////////////////////////////////////////////////
//button return to home page
backBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagUpdateFoodOpen === 1 || flagUpdateContactMan === 1 || flagUpdateAssociation === 1){
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  closePopupWindow();
  window.location.href = 'homePageLargeOrg.html?username=' + encodeURIComponent(username);
  
});
//
refreshPageBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagUpdateFoodOpen === 1 || flagUpdateContactMan === 1 || flagUpdateAssociation === 1){
    return;
  }
  closePopupWindow();
  showAllDonation();
  
});
//
showContactManBtn.addEventListener("click", function() {
  event.preventDefault();

  tempContactMan = [];
  if(flagUpdateFoodOpen === 0 && flagUpdateAssociation === 0 && flagUpdateContactMan === 0){
    const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
    if(selectedDonation === null){
      alert("Please select a donation");
      return;
    }
    currentNumber= selectedDonation.value;
    const donationNumber = selectedDonation.value;
    currentNumber= selectedDonation.value;
   
    // Update the donation count in the HTML
    const donationCountElement1 = document.getElementById('donationCountContactMan');
    donationCountElement1.textContent = `(#${tempNumber[donationNumber]})`;
    const donationCountElement2 = document.getElementById('donationCountPickupContactMan');
    donationCountElement2.textContent = `(#${tempNumber[donationNumber]})`;
    showContactManInTable(donationNumber);
    openShowContactManModal();
    const radioButtons = document.querySelectorAll('input[name="donationRadioDetails"]');
    // Enable all radio buttons
    radioButtons.forEach(function(radio) {
      radio.disabled = true;
    });
    flagUpdateContactMan = 1;
  }
  else{
    alert("Close all the window before");
  }
});
//open the up
updateFoodBtn.addEventListener("click", function() {
  event.preventDefault();
  if(flagUpdateFoodOpen === 0 && flagUpdateAssociation === 0 && flagUpdateContactMan === 0){
    const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
    if(selectedDonation === null){
      alert("Please select a donation");
      return;
    }
    currentNumber= selectedDonation.value;
    const donationNumber = selectedDonation.value;
    currentNumber= selectedDonation.value;
   
    // Update the donation count in the HTML
    const donationCountElement = document.getElementById('donationCountaddfood');
    donationCountElement.textContent = `(#${tempNumber[donationNumber]})`;

    if(booleanArray[donationNumber] === -1){
      getSurplusFoodItems(donationNumber)
      booleanArray[donationNumber] = 1;
    }
    const radioButtons = document.querySelectorAll('input[name="donationRadioDetails"]');
    // Enable all radio buttons
    radioButtons.forEach(function(radio) {
      radio.disabled = true;
    });
    openAddFoodDonationModal();
    flagUpdateFoodOpen = 1;
  }
  else{
    alert("Close the all the window before");
  }
});
//open information about donation
showDetailsBtn.addEventListener("click", function() {
  event.preventDefault();

  closePopupWindow();
  displaySurplusFoodPopup(currentNumber);
  
});
//add food to list
addFoodToListBtn.addEventListener("click", function() {
    event.preventDefault();
    if(checkFields()){
        addFood(currentNumber);
    }
});
//open window confirm update
saveUpdateBtn.addEventListener("click", function() {
  event.preventDefault();
 
  if(surplusFoodReports[currentNumber] === 0){
    alert("The donation is empty, it is impossible to save");
    return;
  }
  else if(JSON.stringify(surplusFoodReports[currentNumber]) !== JSON.stringify(tempSurplusFoodReports[currentNumber]) 
  || JSON.stringify(surplusFoodItems[currentNumber]) !== JSON.stringify(tempSurplusFoodItems[currentNumber])){ 
    // Arrays are not equal
    openConfirmDonationModal();
  }
  else{
    console.log("No update was made");
    closeAddFoodDonationModal();
    flagUpdateFoodOpen = 0;
    currentNumber=-1;
  }
  
});
//close window add food to list
closeaddFoodBtn.addEventListener("click", function() {
  event.preventDefault();

  /* if(surplusFoodReports[currentNumber]!==tempSurplusFoodReports[currentNumber]){
    alert("Changes have been made press save before");
    return;
  } */ 
  if(JSON.stringify(surplusFoodReports[currentNumber]) !== JSON.stringify(tempSurplusFoodReports[currentNumber]) 
  || JSON.stringify(surplusFoodItems[currentNumber]) !== JSON.stringify(tempSurplusFoodItems[currentNumber])){ 
    // Arrays are not equal
    alert("Changes have been made press save before");
    return;
  }

  const disabledRadios = document.querySelectorAll('input[name="donationRadioDetails"]:disabled');
  //Enable the disabled radio buttons
  disabledRadios.forEach(function(radio) {
    radio.disabled = false;
  });
  closePopupWindow();
  closeAddFoodDonationModal();
  flagUpdateFoodOpen = 0;
  currentNumber = -1;
 
});
//open window to report on association
updateAssociationBtn.addEventListener("click", function() {
   event.preventDefault();
   if(flagUpdateAssociation === 0 && flagUpdateFoodOpen === 0 && flagUpdateContactMan === 0){
    const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
    if(selectedDonation === null){
      alert("Please select a donation");
      return;
    }
    
    currentNumber= selectedDonation.value;

    //Update the donation count in the HTML
    const donationCountElement = document.getElementById('donationCountoptionalpickup');
    donationCountElement.textContent = `(#${tempNumber[currentNumber]})`;
    //const donationNumber = selectedDonation.value;
    //currentNumber= selectedDonation.value;
    openOptionAssociationModal();
    flagUpdateAssociation = 1;
    const radioButtons = document.querySelectorAll('input[name="donationRadioDetails"]');
    // Enable all radio buttons
    radioButtons.forEach(function(radio) {
      radio.disabled = true;
    });
  }
  else{
    alert("Close all the window before");
  }
});
//open window confirm update
saveAssociationBtn.addEventListener("click", function() {
  event.preventDefault();

  const selectElement = document.getElementById('associationselect_id');
  const selectedIndex = selectElement.selectedIndex;
  if (selectedIndex !== -1) {
    selectAssociation = selectElement.options[selectedIndex].text;
    sendUpdateAssociationToTheDatabase();
  }
  else{
    closeAddFoodDonationModal();
    flagUpdateAssociation = 0;
    currentNumber=-1;
  }
});
//
closeAssociationBtn.addEventListener("click", function() {
  event.preventDefault();
  closeOptionAssociationModal();
  const disabledRadios = document.querySelectorAll('input[name="donationRadioDetails"]:disabled');
  //Enable the disabled radio buttons
  disabledRadios.forEach(function(radio) {
    radio.disabled = false;
  });
  flagopen2 = 0;
  flagUpdateAssociation = 0;

});
//
changeContactManBtn.addEventListener("click", function() {
  event.preventDefault();
  closeShowContactManModal();
  openPickupContactManModal();
  
});
//
closechangeContactManBtn.addEventListener("click", function() {
  event.preventDefault();
  closeShowContactManModal();
  const disabledRadios = document.querySelectorAll('input[name="donationRadioDetails"]:disabled');
  //Enable the disabled radio buttons
  disabledRadios.forEach(function(radio) {
    radio.disabled = false;
  });
  flagUpdateContactMan = 0;
});
//open window confirm update contact man
saveUpdateContactManBtn.addEventListener("click", function() {
  event.preventDefault();

  const selectedContactMen = [];

  const contactMenCheckboxes = document.querySelectorAll('input[name="contactMan"]:checked');
  //Iterate over the checkboxes and add the selected values to the array
  contactMenCheckboxes.forEach(checkbox => {
    selectedContactMen.push(checkbox.value);
  });
  if (selectedContactMen.length === 0) {
    nameOfContact= null;
  }
  sendUpdateContactManToTheDatabase();
 
});
//
closeUpdateContactManBtn.addEventListener("click", function() {
    event.preventDefault();
    closePickupContactManModal();
    const disabledRadios = document.querySelectorAll('input[name="donationRadioDetails"]:disabled');
    //Enable the disabled radio buttons
    disabledRadios.forEach(function(radio) {
      radio.disabled = false;
    });
    flagopen2 = 0;
    flagUpdateContactMan = 0;
});

/////////////////////////////////////////////////////////////////
//open window to pickup association
function openOptionAssociationModal() {
    if (optionAssociationModal) {
        optionAssociationModal.style.display = 'block';
    }
}
function closeOptionAssociationModal() {
    if (optionAssociationModal) {
        optionAssociationModal.style.display = 'none';
    }
}
//open window to add food to list
function openAddFoodDonationModal() {
    if (addFoodDonationModal) {
        addFoodDonationModal.style.display = 'block';
    }
}
function closeAddFoodDonationModal() {
    if (addFoodDonationModal) {
        addFoodDonationModal.style.display = 'none';
    }
}
// Function to open the modal
function openShowContactManModal() {
  if (showContactManModal) {
    showContactManModal.style.display = 'block';
  }
}
// Function to close the  modal
function closeShowContactManModal() {
  if (showContactManModal) {
    showContactManModal.style.display = 'none';
  }
}
// Function to open the modal
function openPickupContactManModal() {
  if (pickupContactManModal) {
    pickupContactManModal.style.display = 'block';
  }
}
// Function to close the  modal
function closePickupContactManModal() {
  if (pickupContactManModal) {
    pickupContactManModal.style.display = 'none';
  }
}
//open confirm update
function openConfirmDonationModal() {
  if (confirmDonationModal) {
    confirmDonationModal.style.display = 'block';
  }
}
function closeConfirmDonationModal() {
  if (confirmDonationModal) {
    confirmDonationModal.style.display = 'none';
  }
}
//open window if return to home page
function openReturnModal() {
  if (returnModal) {
    returnModal.style.display = 'block';
  }
}
function closeReturnModal() {
  if (returnModal) {
    returnModal.style.display = 'none';
  }
}
// function handleDeleteBtnModalChoice(choice) {
//     if (choice === 'delete') {
//       // User clicked "delete"
//       event.preventDefault();
//       openDeleteDonationModal();
//     } 
// }

//////////////////////////////////////////////////////////////////
//
function handleConfirmDonationModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    closeConfirmDonationModal();
    closeAddFoodDonationModal();
    sendUpdateFoodToTheDatabase();
    flagUpdateOpen = 0;
  } else {
    // User clicked "No"
    event.preventDefault();
    closeConfirmDonationModal();
  }
}

function handleReturnModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    closeReturnModal();
    window.location.href = 'homePageLargeOrg.html?username=' + encodeURIComponent(username);

  } else {
    // User clicked "No"
    event.preventDefault();
    const disabledRadios = document.querySelectorAll('input[name="donationRadio"]:disabled');
    // Enable the disabled radio buttons
    disabledRadios.forEach(function(radio) {
      radio.disabled = false;
    });
    closeReturnModal();
  }
}
//
function addFood(num) {
    // Save the input values
    const foodType = foodTypeInput.value;
    const quantity = quantityInput.value;
    const unit = unitSelect.value;
  
    //Reset the form
    foodTypeInput.value = '';
    quantityInput.value = '';
    unitSelect.value = '';
  
     //Create a new surplus food item
    const surplusFoodItem = {
      foodType: foodType,
      quantity: quantity,
      unit: unit
    };
   
    surplusFoodItems[num].push(surplusFoodItem);
    //tempSurplusFoodItems.push(tempSurplusFoodItem);
    // Increment surplus food reports count
    surplusFoodReports[num]++;
    //tempSurplusFoodReports++;

    if (tempPopup.open) {
      displaySurplusFoodPopup(currentNumber);
    }
}
//
function checkFields(){
    
    if (foodTypeInput.value.trim() === '' && quantityInput.value.trim() === '' && unitSelect.value.trim() === '') {
        alert("Please fill in the fields");
        return false;
    } 
    // Validate input fields
    if (foodTypeInput.value.trim() === '') {
      alert('Please enter the food type.');
      return false;
    }
  
    if (quantityInput.value.trim() === '') {
      alert('Please enter the quantity.');
      return false;
    }
  
    if (unitSelect.value.trim() === '') {
      alert('Please select the unit of measurement.');
      return false;
    }
  
    const quantity = parseInt(quantityInput.value.trim());
    if (quantity <= 0) {
      alert('Quantity should be a positive number greater than zero.');
      return false;
    }
  
    // Validate food type
    const foodstr = foodTypeInput.value.trim();
    const foodTypeRegex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
    
    if (!foodstr.match(foodTypeRegex)) {
      alert('Food type should only contain letters and spaces.');
      return false;
    }
    return true;
}
//
function sendUpdateContactManToTheDatabase(){

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const num = currentNumber;

  //Save the selected contact men in an array
  const selectedContactMen = [];

  const contactMenCheckboxes = document.querySelectorAll('input[name="contactMan"]:checked');
  //Iterate over the checkboxes and add the selected values to the array
  contactMenCheckboxes.forEach(checkbox => {
    selectedContactMen.push(checkbox.value);
  });

  let nameOfContact = selectedContactMen.slice();
  if (selectedContactMen.length === 0) {
      nameOfContact= null;
  }

  const registrationData = {
    num,
    email,
    nameOfContact,
  }
  // Send POST request to server donation details
  fetch('http://localhost:3001/updateContactManInDonation', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Registration response from the server
    //Handle success response, e.g., display a success message
    if (data.message) {
        console.log("The update was done successfully(client!)");
        showAllDonation();
        closePickupContactManModal();
        flagUpdateContactMan = 0;
        resetContactManCheckboxes();
        closePopupWindow();
    }
  })
  .catch(error => {
    console.log(error); // Error message
    // Handle error, e.g., display an error message
    alert("The update was not successful.");
  });
}
//
function sendUpdateAssociationToTheDatabase(){

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');

    const num = currentNumber;

    type= "Large Organization";

    console.log("email", email);
    console.log("num:", num);

    let status = "Not Available";

    if(selectAssociation === ''){
        association = null;
        status = "Available";
    }
    else{
        association=selectAssociation;
    }
    console.log("association: ", association);
    const selectElement = document.getElementById('associationselect_id');
    selectElement.selectedIndex = 0;

    const registrationData = {
      num,
      email,
      status,
      association,
      type,
    }
    // Send POST request to server donation details
    fetch('http://localhost:3001/updateAssociation', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Registration response from the server
      //Handle success response, e.g., display a success message
      if (data.message) {
          console.log("The update was done successfully(client!)");
          showAllDonation();
          closeOptionAssociationModal();
          flagUpdateAssociation = 0;
          selectAssociation = null;
          closePopupWindow();
      }
    })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      alert("The update was not successful.");
    });
}
//
function sendUpdateFoodToTheDatabase(){
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  console.log("email: " + email);
  const num = currentNumber;
  console.log("num: (send):" + num);
  //Continue with the donation process using the retrieved user details
  fetch(`http://localhost:3001/getDonationDetails?email=${encodeURIComponent(email)}&num=${encodeURIComponent(num)}`)
    .then(response => response.json())
    .then(data => {
        const userFullName = data.name;
        const userLocation= data.location;
        //const userAssociation= data.association;
        const userType = data.type;

        //Continue with the donation process using the retrieved user details
        const name = userFullName;
        const location = userLocation;
        //let association = userAssociation;
        const food = surplusFoodItems[currentNumber].slice();
        const numItems = surplusFoodReports[currentNumber];
        
        const createdAt = new Date(); // Current timestamp
        let dateTime = new Date();
        const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        
        const date = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;

        const type = userType;
        const rejected = "NO";

        const registrationData = {
          num,
          name,
          email,
          location,
          date,
          createdAt,
          type,
          rejected,
          numItems,
          food,
        };
        // Send POST request to server donation details
        fetch('http://localhost:3001/updateDonationDetails', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationData)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Registration response from the server
          //Handle success response, e.g., display a success message
          if (data.message) {
              console.log("The update was done successfully(client!)");
              openReturnModal();
              showAllDonation();
              surplusFoodItems[num] = null;
              tempSurplusFoodItems[num] = null;
              surplusFoodReports[num] = 0;
              tempSurplusFoodReports[num]=0;
              booleanArray[num] = -1;
              flagUpdateFoodOpen = 0;
              closePopupWindow();
          }
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          alert("The update was not successful.");
        });
    })
    .catch(error => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
}
// Function to fetch and update surplus food items
function getSurplusFoodItems(num) {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  fetch(`http://localhost:3001/getDonationItems?email=${encodeURIComponent(email)}&num=${encodeURIComponent(num)}`)
    .then((response) => response.json())
    .then((data) => {
      // Update the surplusFoodItems array and surplusFoodReports count
      //surplusFoodItems[num] = data.food.slice();
      //surplusFoodReports[num] = data.numItems;
      currentAssociation = data.association;
      surplusFoodItems[num] = JSON.parse(JSON.stringify(data.food));
      surplusFoodReports[num] = data.numItems;
      tempSurplusFoodItems[num] = JSON.parse(JSON.stringify(data.food));
      tempSurplusFoodReports[num] = data.numItems;

      console.log("association: " + currentAssociation);
      //displaySurplusFoodPopup(num);
    })
    .catch((error) => {
      console.log("Failed to fetch surplus food items:", error);
      // Handle error
      // ...
    });
    return true;
}
// Function to display the popup with surplus food items
function displaySurplusFoodPopup(num) {

 /*popupWindow.forEach(window => {
    if (!window.closed) {
      window.close();
    }
  });
  popupWindows = []; */

  //Generate the content for the popup
  popupContent = '<div class="popup-window">';
  //popupContent += '<h3>Surplus Food Items</h3>';
  popupContent += `<h3>Surplus Food Items - Donation ${tempNumber[num]}</h3>`;
  //popupContent += '<button class="pagerefresh-btn" id="pagerefresh_id" type="submit">Refresh</button>';
  popupContent += '<hr>';

  if (surplusFoodReports[num] === 0) {
    popupContent += '<p>No surplus food items added.</p>';
  } else {
    surplusFoodItems[num].forEach((item, index) => {
      popupContent += `<p><strong>Item ${index + 1}</strong></p>`;
      popupContent += `<p>Food Type: ${item.foodType}</p>`;
      popupContent += `<p>Quantity: ${item.quantity} ${item.unit}</p>`;
      popupContent += `<button class="remove-btn" data-index="${index}">Remove</button>`;
      popupContent += `<button class="update-btn" data-index="${index}">Update</button>`;
      popupContent += `<hr>`;
    });
  }

  popupContent += '</div>';

   //Open a new window with the popup content
   const screenWidth = window.screen.width;
   const screenHeight = window.screen.height;
   const popupWidth = 400;
   const popupHeight = 600;
   const leftPosition = (screenWidth - popupWidth) / 8;
   const topPosition = (screenHeight - popupHeight) / 3;

   const cssStyle= '<link rel="stylesheet" type="text/css" href="popup.css"/>';  

   popupWindow = window.open('', 'Surplus Food Items', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
   popupWindow.document.write(`<html><head><title>Surplus Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);
   //popupWindows.push(popupWindow);

   //displaySurplusFoodPopup();
   popupWindow.document.close();

   tempPopup=popupWindow;

    // Add event listener to the remove buttons within the popup
   const removeButtons = popupWindow.document.querySelectorAll('.remove-btn');
   const updateQuantity = popupWindow.document.querySelectorAll('.update-btn');
   //const refreshPageBtn = popupWindow.document.getElementById('pagerefresh_id');

   removeButtons.forEach((button) => { button.addEventListener('click', function (event) {
      event.preventDefault();

      //Get the index of the item to be removed from the button's data attribute
      const index = parseInt(button.dataset.index);

      //Remove the item from the surplusFoodItems array
      surplusFoodItems[num].splice(index, 1);
      surplusFoodReports[num]--;
      // Close the current popup window
      popupWindow.close();

      //Display the updated popup window
      displaySurplusFoodPopup(num);
    });
  });

  updateQuantity.forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
    
        // Get the index of the item to be updated from the button's data attribute
        const index = parseInt(button.dataset.index);
    
        // Open a new window with the form to update the quantity
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const popupWidth = 500;
        const popupHeight = 350;
        const leftPosition = (screenWidth - popupWidth) / 2;
        const topPosition = (screenHeight - popupHeight) / 2;
    
        const cssStyle= '<link rel="stylesheet" type="text/css" href="popup.css"/>';  

        const updateWindow = window.open('', 'Update Quantity', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`);
        //popupWindow.document.write(`<html><head><title>Update Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);
        // Generate the content for the update window
        const updateContent = `
          <h3>Update Quantity</h3>
          <p>Type food: ${surplusFoodItems[num][index].foodType}</p> 
          <p>Current Quantity:  ${surplusFoodItems[num][index].quantity}</p>
          <p>unit: ${surplusFoodItems[num][index].unit}</p>
          <hr>
          <form class="form-update-popup" id="form-update">
            <label for="new-quantity">New Quantity:</label>
            <input type="number" id="new-quantity" required>
            <br>
            <button class="updatequantity-btn" id="updatequantity" type="submit">Update</button>
          </form>
        `;
    
        // Write the content to the update window
        updateWindow.document.write(`<html><head><title>Update Quantity</title>${cssStyle}</head><body>${updateContent}</body></html>`);
        updateWindow.document.close();
    
        // Add submit event listener to the update form
        const updateForm = updateWindow.document.getElementById('form-update');
        updateForm.addEventListener('submit', function (event) {
          event.preventDefault();
    
          // Retrieve the new quantity value from the form input
          const newQuantity = parseInt(updateWindow.document.getElementById('new-quantity').value);
    
          // Update the quantity of the corresponding surplusFoodItems array item
          surplusFoodItems[num][index].quantity === newQuantity
         
          surplusFoodItems[num][index].quantity = newQuantity;
          updateWindow.close();
          // Display the updated popup window
          displaySurplusFoodPopup(num);
        });
      });
    });     
}
//
function showAllDonation() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  let lineNum = 1;
  let i = 1;
  // Fetch the donation data from the server based on the user's email
  fetch(`http://localhost:3001/getAllDonation?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableDonationshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';

      // Check if donations data exists and is an array
      if (Array.isArray(data.donations)) {
        // Create table rows and populate with data
        data.donations.forEach(donationDetails => {
          const row = tableBody.insertRow();
          const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const dateCell = row.insertCell();
          const locationCell = row.insertCell();
          const associationCell = row.insertCell();
          const statusCell = row.insertCell();
          const itemsCell = row.insertCell();
          const timeLife = row.insertCell();

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadioDetails';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput);

          //numCell.textContent = donationDetails.num;
          numCell.textContent = lineNum++;
          dateCell.textContent = donationDetails.date;
          locationCell.textContent = donationDetails.location;
          associationCell.textContent = donationDetails.association;
          statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;

          tempNumber[donationDetails.num] = i++;
          const createdAt = new Date(donationDetails.createdAt);
          const lifetimeHours = 24; // Assuming 24-hour lifetime

          function updateTimer() {
            const now = new Date();
            const elapsedMilliseconds = now - createdAt;
            const remainingMilliseconds = lifetimeHours * 60 * 60 * 1000 - elapsedMilliseconds;

            if (remainingMilliseconds <= 0) {
              timeLife.textContent = 'Expired';
            } else {
              const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
              const hours = Math.floor(remainingSeconds / 3600);
              const minutes = Math.floor((remainingSeconds % 3600) / 60);
              const seconds = remainingSeconds % 60;
              timeLife.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              setTimeout(updateTimer, 1000);
            }
          }
          updateTimer();
        });
      } else {
        console.log('No donation data available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//
function displayAssociation() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
  const type = "Association";

  // Get details about the user
  fetch(`http://localhost:3001/getUsers?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const city = data.city;

      // Fetch the contact men data from the server based on the user's organization
      fetch(`http://localhost:3001/getAssociationSelectByType?type=${encodeURIComponent(type)}`)
        .then(response => response.json())
        .then(data => {
          const selectElement = document.getElementById('associationselect_id');

          // Clear any existing options
          selectElement.innerHTML = '';

          // Add a default empty option
          const defaultOption = document.createElement('option');
          defaultOption.value = ' ';
          defaultOption.textContent = '';
          selectElement.appendChild(defaultOption);

          // Add options for each contact man
          data.association.forEach(associationUser => {
            const option = document.createElement('option');
            option.value = associationUser.id;
            option.textContent = associationUser.name;
            selectElement.appendChild(option);
          });
        })
        .catch(error => {
          console.log(error);
          // Handle error, e.g., display an error message on the page
        });
    })
    .catch(error => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
}
//
function displayContactMenCheckBox() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const contactManTableBody = document.getElementById('contactManList');

  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getContactManName?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const contactManNames = data.contactMan;

      // Add rows for each contact man in the table
      contactManNames.forEach(contactManName => {
        const row = document.createElement('tr');

        const checkboxCell = document.createElement('td');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.name = 'contactMan';
        checkboxInput.value = contactManName;

        const nameCell = document.createElement('td');
        nameCell.textContent = contactManName;

        checkboxCell.appendChild(checkboxInput);
        row.appendChild(checkboxCell);
        row.appendChild(nameCell);
        contactManTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.log(error);
      // Handle error, e.g., display an error message on the page
      // document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    });
}
//
function showContactManInTable(num) {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
 
  let lineNum = 1;
  let i=0;
  tempContactMan = []

  // Fetch the donation data from the server based on the user's email and donation number
  fetch(`http://localhost:3001/getDonationDetailsContactMan?email=${encodeURIComponent(email)}&num=${encodeURIComponent(num)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('contactManListShow_id');

      // Clear existing table body content
      tableBody.innerHTML = '';

      tempContactMan = data.nameOfContact;
      if (typeof tempContactMan === 'string') {
        tempContactMan = tempContactMan.split(',');
      }

      if(data.nameOfContact !== null){
        //tableBody.innerHTML = '';
        for(let j=0; j<tempContactMan.length; j++){
          const row = tableBody.insertRow();
          const lineNumCell = row.insertCell();
          const nameCell = row.insertCell();

          lineNumCell.textContent = lineNum++;
          nameCell.textContent = tempContactMan[i++];
        }

      }else {
        const row = tableBody.insertRow();
        const lineNumCell = row.insertCell();
        const nameCell = row.insertCell();

        lineNumCell.textContent = lineNum++;
        nameCell.textContent = "#############";
        console.log('No contact man available.');
        alert("No contact man available.");
      }
    })
    .catch(error => {
      console.log(error);
    });

    tempContactMan = [];
}
