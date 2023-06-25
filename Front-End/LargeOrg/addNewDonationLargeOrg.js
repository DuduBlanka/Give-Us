
// Get the input fields
const foodTypeInput = document.getElementById('food-type');
const quantityInput = document.getElementById('quantity');
const unitSelect = document.getElementById('chooseunit');
const pickUpChoose= document.getElementById('choose-yes');


//Get the modal elements
const addFoodExistModal= document.getElementById('addfoodexistmodal_id')
const confirmModal = document.getElementById('confirmodal_id');
const thanksModal = document.getElementById('thanksmodal_id');
const associationModal = document.getElementById('chooseassociationmodal_id');
const pickUpModal = document.getElementById('pickupmodal_id')
const pickupContactManModal = document.getElementById('pickupcontactman_id')
const cancelModal = document.getElementById('cancelmodal_id');

////////////////////////////////////////////////////////////////////////////////////
//
const confirmYesButton = document.getElementById('confirmodal-yes');
const confirmNoButton = document.getElementById('confirmodal-no');

const addFoodExistYesButton = document.getElementById('addfoodexist-yes');
const addFoodExistNoButton = document.getElementById('addfoodexist-no');

const thanksYesButton = document.getElementById('thanksmodal-yes');
const thanksNoButton = document.getElementById('thanksmodal-no')

const associationYesButton = document.getElementById('chooseassociation-yes');
const associationNoButton = document.getElementById('chooseassociation-no');

const pickupChooseButton = document.getElementById('choosepickup_id')

const pickupChooseContactManYesButton = document.getElementById('selectContactMen-yes_id')
const pickupChooseContactManNoButton = document.getElementById('selectContactMen-no_id')

const cancelYesButton = document.getElementById('cancelmodal-yes');
const cancelNoButton = document.getElementById('cancelmodal-no');

// Add event listener to the "Yes" button in the confirmation modal
confirmYesButton.addEventListener('click', () => handleConfirmModalChoice('yes'));
// Add event listener to the "No" button in the confirmation modal
confirmNoButton.addEventListener('click', () => handleConfirmModalChoice('no'));

cancelYesButton.addEventListener('click', () => handleCancelModalChoice('yes'));
cancelNoButton.addEventListener('click', () => handleCancelModalChoice('no'));

thanksYesButton.addEventListener('click', () => handleThanksModalChoice('yes'));
thanksNoButton.addEventListener('click', () => handleThanksModalChoice('no'));

associationYesButton.addEventListener('click', () => handleAssociationModalChoice('yes'));
associationNoButton.addEventListener('click', () => handleAssociationModalChoice('no'));


pickupChooseButton.addEventListener('click', () => handlePickUpModalChoice());

pickupChooseContactManYesButton.addEventListener('click', () => handlePickUpContactManModalChoice('save'));
pickupChooseContactManNoButton.addEventListener('click', () => handlePickUpContactManModalChoice('no'));


addFoodExistYesButton.addEventListener('click', () => handleAddFoodExistModalChoice('yes'));
addFoodExistNoButton.addEventListener('click', () => handleAddFoodExistModalChoice('no'));

// Array to store surplus food items
let surplusFoodItems = [];
let surplusFoodReports = 0;
let popupContent = '';
let popupWindow;
var tempPopup = '';
var flag1 = 0;
let flagContact = 0;
let tempNum;
let tempEmail;
let tempType;
let flagConfirmOpen = 0;

/////////////////////////////////////////////////////////////////////////////////////////////
//
function closePopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}
//
function returnToHomePage() {
  // Redirect to the home page
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  closePopupWindow();
  window.location.href = 'homePageLargeOrg.html?username=' + encodeURIComponent(username);
}
// function resetInputFields() {
//   document.getElementById("form-add").reset();
// }
function stayOnAddDonationPage() {
  // Close the confirmation window
  window.close();
}
function resetFormFields(contactMenCheckboxes) {
  const selectElement = document.getElementById('chooseassociation');
  selectElement.selectedIndex = 0;

  contactMenCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
}
/************************************************************************************* */
// Function to open the confirmation modal
function openConfirmModal() {
  if (confirmModal) {
    confirmModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeConfirmModal() {
  if (confirmModal) {
    confirmModal.style.display = 'none';
  }
}

// Function to open the thanks modal
function openThanksModal() {
  if (thanksModal) {
    thanksModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeThanksModal() {
  if (thanksModal) {
    thanksModal.style.display = 'none';
  }
}

// Function to open the cancel modal
function openCancelModal() {
  if (cancelModal) {
    cancelModal.style.display = 'block';
  }
}
// Function to close the cancel modal
function closeCancelModal() {
  if (cancelModal) {
    cancelModal.style.display = 'none';
  }
}

// Function to open the cancel modal
function openAssociationModal() {
  if (associationModal) {
    associationModal.style.display = 'block';
  }
}
// Function to close the cancel modal
function closeAssociationModal() {
  if (associationModal) {
    associationModal.style.display = 'none';
  }
}
//
function openPickUpModal() {
  if (pickUpModal) {
    pickUpModal.style.display = 'block';
  }
}
// Function to close the cancel modal
function closePickUpModal() {
  if (pickUpModal) {
    pickUpModal.style.display = 'none';
  }
}
// Function to open the cancel modal
function openAddFoodExistModal() {
  if (addFoodExistModal) {
    addFoodExistModal.style.display = 'block';
  }
}
// Function to close the cancel modal
function closeAddFoodExistModal() {
  if (addFoodExistModal) {
    addFoodExistModal.style.display = 'none';
  }
}
// Function to open the cancel modal
function openPickupContactManModal() {
  if (pickupContactManModal) {
    pickupContactManModal.style.display = 'block';
  }
}
// Function to close the cancel modal
function closePickupContactManModal() {
  if (pickupContactManModal) {
    pickupContactManModal.style.display = 'none';
  }
}

/******************************************************************************/
// Function to handle the user's choice in the confirmation modal
function handleConfirmModalChoice(choice) {
  if (choice === 'yes') {
    
    // User clicked "Yes"
    event.preventDefault();
    //sendDonationToDatabase();
    //alert('Donation approved!');
    openAssociationModal();
    closeConfirmModal();
  } else {
    // User clicked "No"
    event.preventDefault();
    flagConfirmOpen = 0;
    closeConfirmModal();
  }
}
//
function handleCancelModalChoice(choice) {

 
  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    alert("Donation was canceled");
    returnToHomePage();
  } else {
    // User clicked "No"
    event.preventDefault();
    // Close the cancel modal
    closeCancelModal();
  }
}
//
function handleThanksModalChoice(choice) {
  surplusFoodReports=0;
  surplusFoodItems= [];
  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    //closeCancelModal();
    returnToHomePage();
  } else {
    // User clicked "No"
    event.preventDefault();
    // Close the cancel modal
    closeThanksModal();
  }
}
//
function handleAddFoodExistModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    flag1 = 1;
    event.preventDefault();
    addFood();
    closeAddFoodExistModal();
  } else {
    // User clicked "No"
    event.preventDefault();
    flag1 = 0;
    //Reset the form
    foodTypeInput.value = '';
    quantityInput.value = '';
    unitSelect.value = '';
   
    closeAddFoodExistModal();
  }
}
//
function handleAssociationModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
 
    closeAssociationModal();
    openPickUpModal();

  } else {
    // User clicked "No"
    event.preventDefault();
    closeAssociationModal();
    openPickupContactManModal();
    //sendDonationToDatabase();
  }
}
//
function handleAssociationModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    
    //const pickup = pickUpChoose.value;
    //console.log(pickup);
    closeAssociationModal();
    openPickUpModal();

  } else {
    // User clicked "No"
    event.preventDefault();
    closeAssociationModal();
    openPickupContactManModal();
    //sendDonationToDatabase();
  }
}
//
function handlePickUpModalChoice() {

  event.preventDefault();
  //sendDonationToDatabase();
  closePickUpModal();
  openPickupContactManModal();
}

function handlePickUpContactManModalChoice(choice) {

  if (choice === 'save') {
    // User clicked "Yes"
    event.preventDefault();
    closePickupContactManModal();
    sendDonationToDatabase();
   
  } else {
    // User clicked "No"
    event.preventDefault();
    flagContact = 1;
    closePickupContactManModal();
    sendDonationToDatabase();
  }
}


/**************************************************************************************/
// Function to handle form submission
// Add event listener to form submit button
document.querySelector(".form-donation-box").addEventListener("submit", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Perform any additional actions with the saved data (e.g., send to server)
  if (surplusFoodReports > 0 && foodTypeInput.value.trim() === '' && quantityInput.value.trim() === '' && unitSelect.value.trim() === '') {
    openConfirmModal();
  } 
  else if (foodTypeInput.value.trim() !== '' && quantityInput.value.trim() !== '' && unitSelect.value.trim() !== '') {
    alert("Please click the button Add The Food and then Submit");
  } 
  else if (surplusFoodReports === 0) {
    alert("Please enter at least one report");
  } 
  else {
    alert("Please fill in all the fields and then click the button Add The Food and then Submit");
  }
});

// Add event listener to the submitdonation button
document.getElementById('submitdonation').addEventListener('click', function(event) {
  event.preventDefault();
  if (surplusFoodReports > 0 && foodTypeInput.value.trim() === '' && quantityInput.value.trim() === '' && unitSelect.value.trim() === '') {
    openConfirmModal();
    flagConfirmOpen = 1;
  } else {
    alert("Please enter at least one report and fill in all the fields.");
  }
});
// Add event listener to the backhome button
document.getElementById('backhome').addEventListener('click', function(event) {
  event.preventDefault();
  
  if(flagConfirmOpen === 1){
    alert("You cannot press cancel now");
    return;
  }
  if (surplusFoodReports > 0 ) {
    openCancelModal();
  } else {
    returnToHomePage();
  }
});

// Function to handle adding additional food
document.querySelector(".add-food-button").addEventListener("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Validate input fields
  if (foodTypeInput.value.trim() === '') {
    alert('Please enter the food type.');
    return;
  }

  if (quantityInput.value.trim() === '') {
    alert('Please enter the quantity.');
    return;
  }

  if (unitSelect.value.trim() === '') {
    alert('Please select the unit of measurement.');
    return;
  }

  const quantity = parseInt(quantityInput.value.trim());
  if (quantity <= 0) {
    alert('Quantity should be a positive number greater than zero.');
    return;
  }

  // Validate food type
  const foodstr = foodTypeInput.value.trim();
  const foodTypeRegex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
  
  if (!foodstr.match(foodTypeRegex)) {
    alert('Food type should only contain letters and spaces.');
    return;
  }

  if(surplusFoodReports > 0){
    for (let i = 0; i < surplusFoodItems.length; i++) {
      if(foodTypeInput.value == surplusFoodItems[i].foodType){
        flag1 = 1;
        break;
      }
    }
  }
  if(!flag1){
    addFood();
  }

  if(flag1){
    openAddFoodExistModal();
    flag1 = 0;
  }

});

/**************************************************************************************/
// Function to display the popup with surplus food items
function displaySurplusFoodPopup() {

    // Generate the content for the popup
    popupContent = '<div class="popup-window">';
    popupContent += '<h3>Surplus Food Items</h3>';
    popupContent += '<hr>';
    
    if (surplusFoodItems.length === 0) {
      popupContent += '<p>No surplus food items added.</p>';
    } else {
      surplusFoodItems.forEach((item, index) => {
        popupContent += `<p><strong>Item ${index + 1}</strong></p>`;
        popupContent += `<p>Food Type: ${item.foodType}</p>`;
        popupContent += `<p>Quantity: ${item.quantity} ${item.unit}</p>`;
        popupContent += `<button class="remove-btn" data-index="${index}">Remove</button>`;
        popupContent += `<button class="update-btn" data-index="${index}">Update</button>`;
        popupContent += `<hr>`;
      });
    }
  
    popupContent += '</div>';

     // Open a new window with the popup content
     const screenWidth = window.screen.width;
     const screenHeight = window.screen.height;
     const popupWidth = 400;
     const popupHeight = 600;
     const leftPosition = (screenWidth - popupWidth) / 8;
     const topPosition = (screenHeight - popupHeight) / 3;
  
     const cssStyle= '<link rel="stylesheet" type="text/css" href="popup.css"/>';  

     popupWindow = window.open('', 'Surplus Food Items', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
     popupWindow.document.write(`<html><head><title>Surplus Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);
        
     //displaySurplusFoodPopup();
     popupWindow.document.close();

     tempPopup=popupWindow;

      // Add event listener to the remove buttons within the popup
     const removeButtons = popupWindow.document.querySelectorAll('.remove-btn');
     const updateQuantity = popupWindow.document.querySelectorAll('.update-btn');

     removeButtons.forEach((button) => { button.addEventListener('click', function (event) {
      event.preventDefault();

      //Get the index of the item to be removed from the button's data attribute
      const index = parseInt(button.dataset.index);

      //Remove the item from the surplusFoodItems array
      surplusFoodItems.splice(index, 1);

      surplusFoodReports--;
      // Close the current popup window
      popupWindow.close();

      //Display the updated popup window
      displaySurplusFoodPopup();
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
      <p>Type food: ${surplusFoodItems[index].foodType}</p> 
      <p>Current Quantity:  ${surplusFoodItems[index].quantity}</p>
      <p>unit: ${surplusFoodItems[index].unit}</p>
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
      //surplusFoodItems[index].quantity === newQuantity
     
      surplusFoodItems[index].quantity = newQuantity;
      updateWindow.close();
      // Display the updated popup window
      displaySurplusFoodPopup();
    });
  });
});  
}
  // Add event listener to the button that displays the popup
document.querySelector(".popup-button").addEventListener("click", function(event) {
    event.preventDefault();
    displaySurplusFoodPopup();
});

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
        fetch(`http://localhost:3001/getAssociationSelectByCityAndType?city=${encodeURIComponent(city)}&type=${encodeURIComponent(type)}`)
          .then(response => response.json())
          .then(data => {
            const selectElement = document.getElementById('chooseassociation');
  
            // Clear any existing options
            selectElement.innerHTML = '';
  
            // Add a default empty option
            const defaultOption = document.createElement('option');
            defaultOption.value = null;
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
            // document.getElementById('error').textContent = 'An error occurred. Please try again later.';
          });
      })
      .catch(error => {
        console.log(error);
        alert("An error occurred. Please try again later.");
      });
}
//
function displayContactMen() {
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
function sendDonationToDatabase() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  // Retrieve current number of donations from the database
  fetch(`http://localhost:3001/getDonationCount?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      let num = data.count;

      // Continue with the donation process using the retrieved user details
      fetch(`http://localhost:3001/getUsers?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
          const userFullName = data.name;
          const userAddress = data.address;
          const userCity = data.city;
          const userType = data.type;
          const phone = data.phone;

          
          const name = userFullName;
          const location = userAddress + " " + userCity;
          const city = userCity;
          num = num + 1; // Increment the current count by 1

          const selectElement = document.getElementById('chooseassociation');
          const selectedIndex = selectElement.selectedIndex;
          let association = null;
          let status = "Available";
          console.log("selectedIndex: " + selectedIndex);
          if (selectedIndex !== 0) {
            association = selectElement.options[selectedIndex].text;
            console.log(association);
            status = "Not Available";
          }

          const food = surplusFoodItems.slice();
          const numItems = surplusFoodReports;
          const type = userType;
        
          const dateRejected = null;
          const dateRejectedString = null;
          //const dateRejected = new Date();
          const createdAt = new Date(); // Current timestamp
          let dateTime = new Date();
          const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
          const day = dateTime.getDate();
          const year = dateTime.getFullYear();
          const hour = dateTime.getHours();
          const minute = dateTime.getMinutes();
          
          const date = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;
        
          // Save the selected contact men in an array
          const selectedContactMen = [];

          const contactMenCheckboxes = document.querySelectorAll('input[name="contactMan"]:checked');
          // Iterate over the checkboxes and add the selected values to the array
          contactMenCheckboxes.forEach(checkbox => {
            selectedContactMen.push(checkbox.value);
          });

          let nameOfContact = selectedContactMen.slice();
          if (selectedContactMen.length === 0 || flagContact === 1) {
              nameOfContact= null;
          }

          const rejected = "NO";

          const registrationData = {
            num,
            name,
            email,
            location,
            city,
            association,
            phone,
            status,
            rejected,
            date,
            createdAt,
            dateRejected,
            dateRejectedString,
            type,
            numItems,
            food,
            nameOfContact
          };

          // Send POST request to save the donation details to the database
          fetch('http://localhost:3001/createDonationDetails', {
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
                let count = num;
                const registrationCount = {
                  email,
                  count
                };
                // Update the donation count by incrementing it
                fetch('http://localhost:3001/updateDonationCount', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(registrationCount)
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log(data); // Update response from the server
                    // Handle success response, e.g., display a success message
                    if (data.message) {
                      surplusFoodItems = [];
                      surplusFoodReports = 0;
                      flagContact = 0;
                      flagConfirmOpen = 0;
                      openThanksModal();
                      resetFormFields(contactMenCheckboxes);
                      closePopupWindow();
                    }
                  })
                  .catch(error => {
                    console.log(error); // Error message
                    // Handle error, e.g., display an error message
                    alert("Failed to update donation count. Please try again later.");
                  });
              }
            })
            .catch(error => {
              console.log(error); // Error message
              // Handle error, e.g., display an error message
              alert("Registration failed. Please try again later.");
            });
        })
        .catch(error => {
          console.log(error);
          alert("An error occurred. Please try again later.");
        });
    })
    .catch(error => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
}

function addFood() {
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
   
    surplusFoodItems.push(surplusFoodItem);
    // Increment surplus food reports count
    surplusFoodReports++;
  
    if (tempPopup.open && flag1) {
      displaySurplusFoodPopup();
    }
}