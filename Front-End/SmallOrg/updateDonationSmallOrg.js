//input fields
const foodTypeInput = document.getElementById('food-type');
const quantityInput = document.getElementById('quantity');
const unitSelect = document.getElementById('chooseunit');
const showItemsBtn = document.getElementById('viewitems_id');

////////////////////////////////////////////////////////////////////////////////////////////
//button button-box
const updateFoodBtn = document.getElementById("updatefood_id");
const backBtn = document.getElementById("backhome");

//////////////////////////////////////////////////////////////////////////////////////////////
//form 
const formDelateDonation = document.getElementById('form-displaydonation');
//const formOptionAssociation = document.getElementById('form-optionAssociation');
const formUpdateDonation = document.getElementById('form-updatedonation');
const formReturnHomePage = document.getElementById('form-return');

//select association
//const pickUpAssociation = document.getElementById('associationselect_id');

//////////////////////////////////////////////////////////////////////////////////////
//modal
//const displayDonationModal = document.getElementById('displaydonation_id');
//const optionAssociationModal = document.getElementById('optionAssociation_id');
const addFoodDonationModal = document.getElementById('addfooddonation_id');
const confirmDonationModal = document.getElementById('confirmdonation_id');
const returnModal = document.getElementById('return_id');

////////////////////////////////////////////////////////////////////////////////////////
/* //button displaydonationmodal
const showItemsDonationBtn = document.getElementById('showitem');
const chooseAssociationBtn = document.getElementById('choosediff');
const addFoodBtn = document.getElementById('addfood');
const saveBtn = document.getElementById('saveupdate'); */

///////////////////////////////////////////////////////////////////////////////////////
//button option associationmodal
//const selectAssociationBtn = document.getElementById('chooseassociation');
//const closeAssociationBtn = document.getElementById('closechooseassociation');

///////////////////////////////////////////////////////////////////////////////////////////////
//button addfooddonationmodal
const addFoodToListBtn = document.getElementById('addfoodtolist');
const showItemsToUpdate = document.getElementById('viewitemstoupdate_id');
const saveUpdateBtn = document.getElementById("saveupdate_id");
const closeaddFoodBtn = document.getElementById('closeaddfood');
//const updateAssociationBtn = document.getElementById("choosediff_id");


//////////////////////////////////////////////////////////////////////////////////////////
//button confirmdonationmodal
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');
//button returnmodal
const returnYesBtn = document.getElementById('return-yes');
const returnNoBtn = document.getElementById('return-no');

//
//viewItemsBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
//deleteBtn.addEventListener('click', () => handleDeleteBtnModalChoice('delete'));

confirmYesBtn.addEventListener('click', () => handleConfirmDonationModalChoice('yes'));
confirmNoBtn.addEventListener('click', () => handleConfirmDonationModalChoice('no'));

returnYesBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoBtn.addEventListener('click', () => handleReturnModalChoice('no'));

/////////////////////////////////////////////////////////////////////////////////////////
//var
let currentNumber = 0;
//let currentAssociation = '';
//let selectAssociation = null;
let flagopen1 = 0;
let flagopen2 = 0;
let flagUpdateFoodOpen = 0;
let surplusFoodItems = [1000];
let tempSurplusFoodItems = [1000];
let surplusFoodReports = [1000];
let tempSurplusFoodReports = [1000];
let popupContent = '';
let popupWindow;
var tempPopup = '';
let booleanArray = [1000];
let tempNumber = [];
const length = 1000; // Number of cells in the array

for (let i = 0; i < length; i++) {
  booleanArray[i] = -1;
  surplusFoodItems[i]= null;
  surplusFoodReports[i] = 0;
}

/****************************************************************************/
// Function to handle mouse down event- optionAssociationModal
let isDraggingAddFoodDonation = false;
let dragStartXAddFoodDonation = 0;
let dragStartYAddFoodDonation = 0;

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
// Function to handle mouse up event
function handleMouseUp() {
  isDraggingAddFoodDonation = false;
}
// Add event listeners - addFoodDonationModal
addFoodDonationModal.addEventListener('mousedown', handleMouseDownAddFoodDonation);
document.addEventListener('mousemove', handleMouseMoveAddFoodDonation);
document.addEventListener('mouseup', handleMouseUp);


/**********************************************************************************/
//
function closePopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}

/////////////////////////////////////////////////////////////////////////////////////
//button return to home page
backBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagUpdateFoodOpen === 1){
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  closePopupWindow();
  window.location.href = 'homePageSmallOrg.html?username=' + encodeURIComponent(username);
  
});
//open the up
updateFoodBtn.addEventListener("click", function() {
  event.preventDefault();
  if(flagUpdateFoodOpen === 0){
    const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
    if(selectedDonation === null){
      alert("Please select a donation");
      return;
    }
    currentNumber= selectedDonation.value;
    const donationNumber = selectedDonation.value;
    currentNumber= selectedDonation.value;
    
    // Update the donation count in the HTML
    const donationCountElement = document.getElementById('donationCount');
    donationCountElement.textContent = `(#${tempNumber[currentNumber] })`;
   
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
    alert("Close the update window before");
  }
});
//
showItemsToUpdate.addEventListener("click", function() {
  event.preventDefault();
  displaySurplusFoodPopup(currentNumber);
});
//open information about donation
/* showItemsBtn.addEventListener("click", function() {
  event.preventDefault();
  const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
  if (selectedDonation) {
    const donationNumber = selectedDonation.value;
    closePopupWindow();
    if(booleanArray[donationNumber] === -1){
      getSurplusFoodItems(currentNumber, "show")
      booleanArray[donationNumber] = 1;
    }
    else{
      //displaySurplusFoodPopup(donationNumber);
      displaySurplusFoodPopupOnly(currentNumber);
    }
  } 
  else {
    console.log('No donation selected.');
    alert("Please select a donation to view the data");
  }
}); */
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
    currentNumber = -1;
  }
  
});
//close window add food to list
closeaddFoodBtn.addEventListener("click", function() {
  event.preventDefault();

  /* if(surplusFoodReports[currentNumber]!==tempSurplusFoodReports[currentNumber]){
    alert("Changes have been made press save before");
    return;
  }  */
  if(JSON.stringify(surplusFoodReports[currentNumber]) !== JSON.stringify(tempSurplusFoodReports[currentNumber]) 
  || JSON.stringify(surplusFoodItems[currentNumber]) !== JSON.stringify(tempSurplusFoodItems[currentNumber])){ 
    // Arrays are not equal
    alert("Changes have been made press save before");
    return;
  }
  const disabledRadios = document.querySelectorAll('input[name="donationRadioDetails"]:disabled');
  // Enable the disabled radio buttons
  disabledRadios.forEach(function(radio) {
    radio.disabled = false;
  });
  closePopupWindow();
  closeAddFoodDonationModal();
  flagUpdateFoodOpen = 0;
  currentNumber = -1;
});

//////////////////////////////////////////////////////////////////////
//open window to pickup association
/* function openOptionAssociationModal() {
    if (optionAssociationModal) {
        optionAssociationModal.style.display = 'block';
    }
}
function closeOptionAssociationModal() {
    if (optionAssociationModal) {
        optionAssociationModal.style.display = 'none';
    }
} */
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

///////////////////////////////////////////////////////////////////////////
//
function handleConfirmDonationModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    closeConfirmDonationModal();
    closeAddFoodDonationModal();
    sendUpdateToTheDatabase();
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
    window.location.href = 'homePageSmallOrg.html?username=' + encodeURIComponent(username);

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
function sendUpdateToTheDatabase(){
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
        let association= null;
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
        
        let status = "Available";
        //
        /* let status = "Not Available";
        console.log("association: " + association);
        console.log("selectassocaition: " + selectAssociation);
        if(association !== selectAssociation){
          console.log("not equal!!!")
          if(selectAssociation === ''){
            association = null;
            status = "Available";
            console.log("Available!!!!")
          }
          else{
            association=selectAssociation;
          }
        }
        const selectElement = document.getElementById('associationselect_id');
        selectElement.selectedIndex = 0; */

        const registrationData = {
          num,
          name,
          email,
          location,
          association,
          status,
          date,
          createdAt,
          type,
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
              //currentAssociation = ' ';
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
      //currentAssociation = data.association;
      surplusFoodItems[num] = JSON.parse(JSON.stringify(data.food));
      surplusFoodReports[num] = data.numItems;
      tempSurplusFoodItems[num] = JSON.parse(JSON.stringify(data.food));
      tempSurplusFoodReports[num] = data.numItems;

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

  let index = tempNumber[num];
  // Generate the content for the popup
  popupContent = '<div class="popup-window">';
  //popupContent += '<h3>Surplus Food Items</h3>';
  popupContent += `<h3>Surplus Food Items - Donation ${index}</h3>`;
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
// Function to display the popup with surplus food items
function displaySurplusFoodPopupOnly(num) {

  // Generate the content for the popup
  popupContent = '<div class="popup-window">';
  //popupContent += '<h3>Surplus Food Items</h3>';
  popupContent += `<h3>Surplus Food Items - Donation ${num}</h3>`;
  //popupContent += '<button class="pagerefresh-btn" id="pagerefresh_id" type="submit">Refresh</button>';
  popupContent += '<hr>';

  if (surplusFoodReports[num] === 0) {
    popupContent += '<p>No surplus food items added.</p>';
  } else {
    surplusFoodItems[num].forEach((item, index) => {
      popupContent += `<p><strong>Item ${index + 1}</strong></p>`;
      popupContent += `<p>Food Type: ${item.foodType}</p>`;
      popupContent += `<p>Quantity: ${item.quantity} ${item.unit}</p>`;
      //popupContent += `<button class="remove-btn" data-index="${index}">Remove</button>`;
      //popupContent += `<button class="update-btn" data-index="${index}">Update</button>`;
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
          const timeLifeCell = row.insertCell();

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadioDetails';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput);

          //numCell.textContent = donationDetails.num;
          numCell.textContent = lineNum++;
          dateCell.textContent = donationDetails.date;
          locationCell.textContent = donationDetails.location;
          //associationCell.textContent = donationDetails.association;
          associationCell.textContent = "#####";
          statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;

          tempNumber[donationDetails.num] = i++;

          const createdAt = new Date(donationDetails.createdAt);
          const lifetimeHours = 5; // Assuming 5-hour lifetime

          function updateTimer() {
            const now = new Date();
            const remainingMilliseconds = createdAt.getTime() + lifetimeHours * 60 * 60 * 1000 - now.getTime();

            if (remainingMilliseconds <= 0) {
              timeLifeCell.textContent = 'Expired';
            } else {
              const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
              const hours = Math.floor(remainingSeconds / 3600);
              const minutes = Math.floor((remainingSeconds % 3600) / 60);
              const seconds = remainingSeconds % 60;
              timeLifeCell.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
          }

          updateTimer();
          //setInterval(updateTimer, 1000);
        });
      } else {
        console.log('No donation data available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}


////////////////////////////////////////End////////////////////////////////////////////