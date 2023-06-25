//select
const basicSelect = document.getElementById('usermenuselect_id');
//const actionSelect = document.getElementById('useraction');
const searchDonationSelect = document.getElementById('searchdonation-select_id');


//button
const deleteAccountYesButton = document.getElementById('delete-yes');
const deleteAccountNoButton = document.getElementById('delete-no');
const logoutBtn = document.getElementById("logout");
const chooseBasicBtn = document.getElementById("chooseselect");
const searchDonationBtn = document.getElementById("searchdonation");
const resetDonationBtn = document.getElementById("resetdonation");

//fields
//const inputCitySearch= document.getElementById('inputCity');

//////////////////////////////////////////////////////////////////////////////////////////////
//modal
const deleteUserModal= document.getElementById('deleteuser_id');
const searchDonationModal= document.getElementById('result_id');
const changeUserSettingsModal= document.getElementById('changesettingsusermodal_id');

///////////////////////////////////////////////////////////////////////////////////
//modal button
const showItemsBtn= document.getElementById('showitems_id');
const showPhotoBtn = document.getElementById('showphoto_id');

const saveSettingBtn= document.getElementById('save-yes');
const closeSettingBtn = document.getElementById('exit-no');
/////////////////////////////////////////////////////////////////////////////////////////////
// Add event listener to the "Yes" button in the confirmation modal
deleteAccountYesButton.addEventListener('click', () => handleDeleteAccountModalChoice('yes'));
deleteAccountNoButton.addEventListener('click', () => handleDeleteAccountModalChoice('no'));

///////////////////////////////////////////////////////////////////////////////////////////
//var:
let popupWindows = [];
let popupWindow;
let popupWindowImage;
let tempEmail = [];
let tempNumber = [];
let tempName;
let tempPhone;
let tempType;
let flagDeleteOpen = 0;
let flagSettingOpen = 0;
let receiveEmailCheckbox; 
let receivePhoneCheckbox; 
let notAgreeCheckbox;

closeSearchDonationModal();
/////////////////////////////////////////////////////////////////////////////////////////////////
//
function closePopupWindow() {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
    if (popupWindowImage && !popupWindowImage.closed) {
      popupWindowImage.close();
    }
}
function scrollToModal() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

///////////////////////////////////////////////////////////////////////////////////////////////
//
logoutBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }

    closePopupWindow();
    window.location.href = "../General/homePage.html";
    //console.log("Logout button clicked");
    //alert("bye!!")
});
//
searchDonationBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagDeleteOpen === 1 || flagSettingOpen === 1){
    return;
  }
  let selectedIndex = -1;
  closeSearchDonationModal();
  
  let city = document.getElementById('inputCity').value.trim();
  let selectCity = document.getElementById('searchdonation-select_id');
  selectedIndex = selectCity.selectedIndex;

  if ((selectedIndex === -1 || selectedIndex === 0) && city === '') {
    alert("Please enter a location to search.");
    closeSearchDonationModal();
  } else if ((selectedIndex === -1 || selectedIndex === 0) && city !== '') {
    //closeModals();
    searchDonationInDatabase(city);
  } else {

    //closeModals();
    city = selectCity.options[selectedIndex].text;
    searchDonationInDatabase(city);
  }
  scrollToModal();
});

//
resetDonationBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagDeleteOpen === 1 || flagSettingOpen === 1){
    return;
  }
  closePopupWindow();
  closeSearchDonationModal();
  resetInputFields();
  tempCity = '';
  flagRefresh = 0;

  //Reset the select element
  const selectElement = document.getElementById('searchdonation-select_id');
  selectElement.selectedIndex = -1;
});
//
showItemsBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingOpen === 1){
      return;
    }
    console.log("hello!!");
    const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
    if (selectedDonation) {
      const donationNumber = selectedDonation.value;
      console.log("donation number: " + donationNumber);
      const tableBody = document.getElementById('tableDonationshow_body');
      const rows = tableBody.getElementsByTagName('tr');
      let selectedIndex = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
          selectedIndex = i;
          break;
        }
     }
     displaySurplusFoodPopup(donationNumber, selectedIndex);
    } else {
      console.log('No donation selected.');
      alert("No donation selected.");
    }
});
//
showPhotoBtn.addEventListener('click', async () => {
  event.preventDefault();

  if(flagDeleteOpen === 1 || flagSettingOpen === 1){
    return;
  }
  const selectedPhoto = document.querySelector('input[name="donationRadio"]:checked');
  if (selectedPhoto) {
    const photoNumber = selectedPhoto.value;
    console.log("Photo number: " + photoNumber);
     // Get the index of the selected row
     const tableBody = document.getElementById('tableDonationshow_body');
     const rows = tableBody.getElementsByTagName('tr');
     let selectedIndex = -1;
     for (let i = 0; i < rows.length; i++) {
       if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
         selectedIndex = i;
         break;
       }
     }
    displayPhotoDonation(photoNumber, selectedIndex);
  } else {
    console.log('No photo selected.');
    alert("No photo selected.");
  }
});
//
saveSettingBtn.addEventListener('click', async () => {
  event.preventDefault();

  receiveEmailCheckbox = document.getElementById('email-notifications');
  receivePhoneCheckbox = document.getElementById('phone-notifications');
  notAgreeCheckbox = document.getElementById('no-notifications');

  if (notAgreeCheckbox.checked) {
    const emailAgree = 'NO';
    const phoneAgree = 'NO';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
    return;
  } else if(receiveEmailCheckbox.checked && receivePhoneCheckbox.checked){
    const emailAgree = 'YES';
    const phoneAgree = 'YES';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
  else if(receiveEmailCheckbox.checked){
    const emailAgree = 'YES';
    const phoneAgree = 'NO';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
  else if(receivePhoneCheckbox.checked){
    const emailAgree = 'NO';
    const phoneAgree = 'YES';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
});
//
closeSettingBtn.addEventListener('click', async () => {
  event.preventDefault();
  flagSettingOpen = 0;
  closeSettingsUserModal();
});
//
chooseBasicBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingOpen === 1){
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const basicInput= basicSelect.value;

    switch (basicInput) {
        case "editprofile":
            closeSearchDonationModal();
            window.location.href = "editUserNeedy.html?username=" + encodeURIComponent(username);
            break;
        case "settinguser":
            flagSettingOpen = 1;
            closeSearchDonationModal();
            openSettingsUserModal();
            break;
        case "deletAccount":
            closeSearchDonationModal();
            openDeleteAccountModal();
            flagDeleteOpen = 1;
            break;
        default:
            break;
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
//
function resetInputFields() {
    document.getElementById("inputCity").value = "";
    console.log("reset!");
}

////////////////////////////////////////////////////////////////////////////////////////
// Function to open the confirmation modal
function openDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'block';
    }
}
// Function to close the thanks modal
function closeDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'none';
    }
}
//
function openSearchDonationModal() {
    if (searchDonationModal) {
        searchDonationModal.style.display = 'block';
    }
  }
  // Function to close the thanks modal
function closeSearchDonationModal() {
    if (searchDonationModal) {
        searchDonationModal.style.display = 'none';
    }
}
function openSettingsUserModal() {
  if (changeUserSettingsModal) {
      changeUserSettingsModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeSettingsUserModal() {
  if (changeUserSettingsModal) {
      changeUserSettingsModal.style.display = 'none';
  }
}
////////////////////////////////////////////////////////////////////////////////////////
//
function handleDeleteAccountModalChoice(choice) {

    if (choice === 'yes') {
      // User clicked "Yes"
      event.preventDefault();
      closeDeleteAccountModal();
      deletAccountFromDatabase();
    } else {
      // User clicked "No"
      event.preventDefault();
      // Close the confirmation modal
      flagDeleteOpen = 0;
      closeDeleteAccountModal();
    }
}

///////////////////////////////////////////////////////////////////////////////////////
function displayUser() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    // Send a GET request to the server to fetch user details based on the email
    fetch(`http://localhost:3001/displayUser?email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(data => {
        // Handle the user details data and display it on the page
        const userFullName = data.name;
        const userEmail = data.email;
        const userPhoneNumber = data.phoneNumber;
        const userAddress = data.address;
        const userCity = data.city;
        const userType = data.type;

        document.getElementById('user-name').textContent = userFullName;
        document.getElementById('user-email').textContent = userEmail;
        document.getElementById('user-phone').textContent = userPhoneNumber;
        document.getElementById('user-address').textContent = userAddress +" "+ userCity;
        document.getElementById('user-type').textContent = userType;

        tempName= userFullName;
        tempPhone = userPhoneNumber;
        tempType = userType;

      })
      .catch(error => {
        console.log(error);
        // Handle error, e.g., display an error message on the page
        //document.getElementById('error').textContent = 'An error occurred. Please try again later.';
      });
}
//
function deletAccountFromDatabase(){
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    fetch(`http://localhost:3001/deleteUser?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          closeDeleteAccountModal();
          closePopupWindow();
          window.location.href = "../General/homePage.html";
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          alert("An error occurred. Please try again later.");
        });
}
//
function sendToTheDatabaseTheSettings(emailAgree, phoneAgree){

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const name = tempName;
  const phone = tempPhone;
  const type = tempType;

  const registrationData = {
    name,
    email,
    phone,
    type,
    emailAgree,
    phoneAgree
  };
  //const queryParams = new URLSearchParams(registrationData).toString();

  // Send a GET request to the server to update user settings
  fetch('http://localhost:3001/updateNotification', {
      method: 'POST',
      //mode: 'cors', // Add this line
      //mode: 'no-cors',
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
          receiveEmailCheckbox.checked = false;
          receivePhoneCheckbox.checked = false;
          notAgreeCheckbox.checked = false;
          flagSettingOpen = 0;
          closeSettingsUserModal();
          alert(data.message); // Display the message from the server
        }
        // Optionally, redirect to a new page
        //window.location.href = "homePageNeedy.html";
      })
      .catch(error => {
        console.log(error); // Error message
        // Handle error, e.g., display an error message
        alert("Registration failed. Please try again later.");
        //window.location.href = "registerNeedy.html";
      });
}
//
function displayPhotoDonation(num, index) {
  const type = "Small Organization";
  const email = tempEmail[index];
  console.log("num: " + num);
  console.log("email: " + email);

  fetch(`http://localhost:3001/getPhoto?email=${encodeURIComponent(email)}&num=${encodeURIComponent(num)}`)
    .then(response => response.blob())
    .then(blob => {
      
       //Open a new window with the popup content
       const screenWidth = window.screen.width;
       const screenHeight = window.screen.height;
       const popupWidth = 400;
       const popupHeight = 600;
       const leftPosition = (screenWidth - popupWidth) / 8;
       const topPosition = (screenHeight - popupHeight) / 3;
      // Create a new window for the popup
      //const popupWindow = window.open('', '_blank', 'width=800,height=600');
      popupWindowImage = window.open('', 'Photo of food', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
      // Create a new document within the popup window
      const popupDocument = popupWindowImage.document.open();
      popupDocument.write(`
        <html>
          <head>
            <title>Donation Photo</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family:sans-serif; 
                background: -webkit-linear-gradient(to right, #155799, #159957);  
                background: linear-gradient(to right, #155799, #159957); 
                color:whitesmoke; 
              }
              img {
                max-width: 100%;
                max-height: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${URL.createObjectURL(blob)}" alt="Donation Photo">
          </body>
        </html>
      `);
      popupDocument.close();
    })
    .catch(error => {
      console.log('Error fetching photo:', error);
      alert('Error fetching photo. Please try again.');
    });
}

//
function displaySurplusFoodPopup(num, index) {

    popupWindows.forEach(window => {
      if (!window.closed) {
        window.close();
      }
    });
    popupWindows = [];

    const email = tempEmail[index];
    console.log("email 1: ", email);
    const type = "Small Organization"
    // Generate the content for the popup
    let popupContent = '<div class="popup-window">';
    //popupContent += '<h3>Surplus Food Items</h3>';
    popupContent += `<h3>Surplus Food Items - Donation ${index + 1}</h3>`;
    popupContent += '<hr>';
  
    // Make an HTTP request to fetch the donation items from the server
    fetch(`http://localhost:3001/getDonationItemsByEmailAndNumberAndType?email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}&num=${encodeURIComponent(num)}`)
      .then(response => response.json())
      .then(data => {
        // Check if donation items data exists and is an array
        if (Array.isArray(data.food)) {
          data.food.forEach((item, index) => {
            popupContent += `<p><strong>Item ${index + 1}</strong></p>`;
            popupContent += `<p>Food Type: ${item.foodType}</p>`;
            popupContent += `<p>Quantity: ${item.quantity} ${item.unit}</p>`;
            popupContent += `<hr>`;
          });
        } else {
          popupContent += '<p>No surplus food items available for this donation.</p>';
        }
  
        popupContent += '</div>';
  
        //Open a new window with the popup content
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const popupWidth = 400;
        const popupHeight = 600;
        const leftPosition = (screenWidth - popupWidth) / 8;
        const topPosition = (screenHeight - popupHeight) / 3;
  
        const cssStyle = '<link rel="stylesheet" type="text/css" href="popup.css"/>';
  
        popupWindow = window.open('', 'Surplus Food Items', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
        popupWindow.document.write(`<html><head><title>Surplus Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);
        popupWindows.push(popupWindow);

        tempPopup = popupWindow;
      })
      .catch(error => {
        console.log('Error fetching donation items:', error);
      });
}
//
function searchDonationInDatabase(city) {

  const type = "Small Organization";

  let i = 0;
  let j = 1;
  let lineNum = 1; // Initialize line number variable
  
  fetch(`http://localhost:3001/getDonationDetailsByCityAndType?city=${encodeURIComponent(city)}&type=${encodeURIComponent(type)}`)
    .then(response => response.json())
    .then(data => {
      const table = document.getElementById('tableDonationshow_id');
      const tableBody = document.getElementById('tableDonationshow_body');

      tableBody.innerHTML = ''; // Clear existing table body content

      if (Array.isArray(data.donations)) {
        data.donations.forEach(donationDetails => {
          const row = tableBody.insertRow();
          const radioCell = row.insertCell();
          const lineNumCell = row.insertCell(); // Add line number cell
          //const numCell = row.insertCell();
          const nameCell = row.insertCell();
          const dateCell = row.insertCell();
          const locationCell = row.insertCell();
          const statusCell = row.insertCell();
          const itemsCell = row.insertCell();
          const timeLifeCell = row.insertCell();

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadio';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput);

          //numCell.textContent = donationDetails.num;
          lineNumCell.textContent = lineNum++; // Assign line number
          nameCell.textContent = donationDetails.name;
          locationCell.textContent = donationDetails.date;
          dateCell.textContent = donationDetails.location;
          statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;

          
          openSearchDonationModal();
          scrollToModal();

          const createdAt = new Date(donationDetails.createdAt);
          const lifetimeHours = 5; // Assuming 5-hour lifetime

          
          function updateTimer() {
            const now = new Date();
            const elapsedMilliseconds = now - createdAt;
            const remainingMilliseconds = lifetimeHours * 60 * 60 * 1000 - elapsedMilliseconds;

            if (remainingMilliseconds <= 0) {
              timeLifeCell.textContent = 'Expired';
            } else {
              const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
              const hours = Math.floor(remainingSeconds / 3600);
              const minutes = Math.floor((remainingSeconds % 3600) / 60);
              const seconds = remainingSeconds % 60;
              timeLifeCell.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              setTimeout(updateTimer, 1000);
            }
          }

          updateTimer();
          tempNumber[donationDetails.num] = j++;
          tempEmail[i++] = donationDetails.email;
          //i++;
          
        });
      } else {
        console.log('No donation data available.');
        closeSearchDonationModal();
        return;
      }
    })
    .catch(error => {
      console.log(error);
    });
    //scrollToModal();
}
//
function displayAllCity() {
  const type = "Small Organization";

  // Fetch the contact men data from the server based on the user's organization
  fetch(`http://localhost:3001/getAllCityByType?type=${encodeURIComponent(type)}`)
    .then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById('searchdonation-select_id');

      // Clear any existing options
      selectElement.innerHTML = '';

      // Add a default empty option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '';
      selectElement.appendChild(defaultOption);

      // Add options for each city
      data.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.log(error);
      // Handle error, e.g., display an error message on the page
      // document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    });
}
/******************************************END************************************************/

