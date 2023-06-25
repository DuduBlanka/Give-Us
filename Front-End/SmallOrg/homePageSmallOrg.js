//select id
const basicSelect = document.getElementById('usermenu-select_id');
const actionSelect = document.getElementById('actionmenu-select_id');
const informationSelect = document.getElementById('informationmenu-select_id');

//modal button
const deleteAccountYesButton = document.getElementById('delete-yes');
const deleteAccountNoButton = document.getElementById('delete-no');
const saveSettingBtn= document.getElementById('save-yes');
const closeSettingBtn = document.getElementById('exit-no');


const exitAllDonation= document.getElementById('exite-btn-1_id');
const exitAllDeleteDonation = document.getElementById('exite-btn-2_id');
const exitAllContactMan = document.getElementById('exite-btn-3_id');
//const exitDetailsAssociation = document.getElementById('exite-btn-4_id');
//const exitContactManAssociation = document.getElementById('exite-btn-5_id');

const showDetailsDonationBtn = document.getElementById('showdetailsdonation_id');

//button
const chooseBasicBtn = document.getElementById("chooseselect");
const chooseActionBtn = document.getElementById("chooseaction");
const chooseInformationBtn = document.getElementById("chooseinformationmenu_id");//information
const logoutBtn = document.getElementById("logout");

//modal
const deleteUserModal= document.getElementById('deleteusermodal_id')
const searchDonationModal= document.getElementById('resultmodal_id');
const changeUserSettingsModal= document.getElementById('changesettingsusermodal_id');
const showAllDonationModal= document.getElementById('showdonationmodal_id');
const showAllDeleteDonationModal= document.getElementById('showdeletedonationmodal_id');
const showAllContactManModal= document.getElementById('showallcontactmanmodal_id');
//onst showDetailsAssociationModal= document.getElementById('showdetailsassociationmodal_id');
//const showAllContactManAssociationModal= document.getElementById('showcontactmanassociationmodal_id');

// Add event listener to the "Yes" or "NO" button in the confirmation modal
deleteAccountYesButton.addEventListener('click', () => handleDeleteAccountModalChoice('yes'));
deleteAccountNoButton.addEventListener('click', () => handleDeleteAccountModalChoice('no'));

////////////////////////////////////////////////////////////////////////////////
//var
var emailUser='';
let flagModalOpen = 0;
let flagDeleteOpen = 0;
let flagSettingOpen = 0;
let surplusFoodItems = [];
let surplusFoodReports = 0;
let tempAssociationEmail = [];
let tempAssociationName = [];
let popupWindow;
let popupContent = '';
var tempPopup = '';
let tempName;
let tempPhone;
let tempType;
let tempNumber = [];

/**********************************************************************************/
//
function closePopupWindow() {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
}
//
function scrollToModal() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
//
function closeModals(){
    closeShowAllDonationModal();
    closeShowAllDeleteDonationModal();
    closeShowAllContactManModal();
    //closeDetailsAssociationModal();
    //closeShowAllContactManAssociationModal();
}

//////////////////////////////////////////////////////////////////////////////////////.
//
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
    flagModalOpen = 0;
    flagSettingOpen = 0;
    closeSettingsUserModal();
});
//
logoutBtn.addEventListener("click", function() {
    event.preventDefault();
    
    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }
    window.location.href = "../General/homePage.html";
});
//
showDetailsDonationBtn.addEventListener("click", function() {
    event.preventDefault();
    
    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }
    const selectedDonation = document.querySelector('input[name="donationRadioDetails"]:checked');
    if (selectedDonation) {
      const donationNumber = selectedDonation.value;
      closePopupWindow();
      
      displaySurplusFoodPopup(donationNumber);
    } else {
        console.log('No donation selected.');
        alert("Please select a donation to view the data");
    }
    
});
//
exitAllDonation.addEventListener("click", function() {
    event.preventDefault();
    closeShowAllDonationModal();
    flagModalOpen = 0;
});
//
exitAllDeleteDonation.addEventListener("click", function() {
    event.preventDefault();
    closeShowAllDeleteDonationModal();
    flagModalOpen = 0;
});
//
exitAllContactMan.addEventListener("click", function() {
    event.preventDefault();
    closeShowAllContactManModal();
    flagModalOpen = 0;
});
// //
// exitDetailsAssociation.addEventListener("click", function() {
//     event.preventDefault();
//     closeDetailsAssociationModal();
//     closeShowAllContactManAssociationModal();
//     flagModalOpen = 0;
// });
// //
// exitContactManAssociation.addEventListener("click", function() {
//     event.preventDefault();
//     closeShowAllContactManAssociationModal();
//     flagModalOpen = 0;
// });
//
chooseBasicBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const basicInput= basicSelect.value;
   
    switch (basicInput) {
        case "editprofile":
            window.location.href = "editUserSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "settinguser":
            //closeSearchDonationModal();
            flagSettingOpen = 1;
            openSettingsUserModal();
            break;
        case "addcontactman":
            window.location.href = "addContactManSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "updatecontactman":
            window.location.href = "upDateContactmanSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "deletacontactman":
            window.location.href = "deleteContactManSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "deletAccount":
            flagDeleteOpen = 1;
            openDeleteAccountModal();
            break;
        default:
            break;
    }

});
//
chooseActionBtn.addEventListener("click", function() {
    event.preventDefault();
   
    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const actionInput= actionSelect.value;
   
    switch (actionInput) {
        case "add-donation":
            window.location.href = "addNewDonationSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "updatedonation":
            window.location.href = "updateDonationSmallOrg.html?username=" + encodeURIComponent(username);
            break;
        case "deletedonation":
            window.location.href = "deleteDonationSmallOrg.html?username=" + encodeURIComponent(username);
            break;

        /* case "":
            window.location.href = ".html";
            break;
        case "deletAccount":
            window.location.href = ".html";
            break; */

        default:
            break;
    }
});
//
chooseInformationBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingOpen){
      return;
    }

    const informationInput= informationSelect.value;
    
    switch (informationInput) {
     
        case "showalldonation":
            closeModals();
            openShowAllDonationModal();
            showAllDonation();
            //flagModalOpen = 1;
            break;
        case "showalldeletedonation":
            closeModals();
            openShowAllDelelteDonationModal();
            showAllDeleteDonation();
            //flagModalOpen = 1;
            break;
        case "showallcontactman":
            closeModals();
            displayContactMen();
            openShowAllContactManModal();
            //flagModalOpen = 1;
            break;
        case "showdetailsassociation":
            closeModals();
            displayAllAssociation();
            openDetailsAssociationModal();
            //flagModalOpen = 1;
            break;
        default:
            break;
    }
});

/////////////////////////////////////////////////////////////////////////////////////
// Function to open the  modal
function openDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'block';
    }
  }
  // Function to close the  modal
function closeDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'none';
    }
}
//
function openSettingsUserModal() {
    if (changeUserSettingsModal) {
        changeUserSettingsModal.style.display = 'block';
    }
}
// Function to close the modal
function closeSettingsUserModal() {
    if (changeUserSettingsModal) {
        changeUserSettingsModal.style.display = 'none';
    }
}
function openShowAllDonationModal() {
    if (showAllDonationModal) {
      showAllDonationModal.style.display = 'block';
    }
}
//Function to close the setting modal
function closeShowAllDonationModal() {
    if (showAllDonationModal) {
      showAllDonationModal.style.display = 'none';
    } 
}
//
function openShowAllDelelteDonationModal() {
    if (showAllDeleteDonationModal) {
        showAllDeleteDonationModal.style.display = 'block';
    }
}
//Function to close the setting modal
function closeShowAllDeleteDonationModal() {
    if (showAllDeleteDonationModal) {
        showAllDeleteDonationModal.style.display = 'none';
    } 
}
//
function openShowAllContactManModal() {
    if (showAllContactManModal) {
        showAllContactManModal.style.display = 'block';
    }
}
//Function to close the setting modal
function closeShowAllContactManModal() {
    if (showAllContactManModal) {
        showAllContactManModal.style.display = 'none';
    } 
 }
  //
/* function openDetailsAssociationModal() {
    if (showDetailsAssociationModal) {
        showDetailsAssociationModal.style.display = 'block';
    }
}
//Function to close the setting modal
function closeDetailsAssociationModal() {
    if (showDetailsAssociationModal) {
        showDetailsAssociationModal.style.display = 'none';
    } 
}
//
function openShowAllContactManAssociationModal() {
    if (showAllContactManAssociationModal) {
        showAllContactManAssociationModal.style.display = 'block';
    }
}
//Function to close the setting modal
function closeShowAllContactManAssociationModal() {
    if (showAllContactManAssociationModal) {
        showAllContactManAssociationModal.style.display = 'none';
    } 
} */
/////////////////////////////////////////////////////////////////////////////////////
//
function handleDeleteAccountModalChoice(choice) {

    if (choice === 'yes') {
      // User clicked "Yes"
      event.preventDefault();
      deleteAccountFromDatabase();
      window.location.href = "../General/homePage.html";
      closeDeleteAccountModal();
    } else {
      // User clicked "No"
      event.preventDefault();
      flagDeleteOpen = 0;
      // Close the confirmation modal
      closeDeleteAccountModal();
    }
}

////////////////////////////////////////////////////////////////////////////
//
function deleteAccountFromDatabase(){
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
function displayUser() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    console.log(email);
    //Send a GET request to the server to fetch user details based on the email
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
  
        tempName = userFullName;
        tempPhone = userPhoneNumber;
        tempType = userType;
  
        document.getElementById('user-name').textContent = userFullName;
        document.getElementById('user-email').textContent = userEmail;
        document.getElementById('user-phone').textContent = userPhoneNumber;
        document.getElementById('user-address').textContent = userAddress +" "+ userCity;
        document.getElementById('user-type').textContent = userType;
      })
      .catch(error => {
        console.log(error);
        // Handle error, e.g., display an error message on the page
        //document.getElementById('error').textContent = 'An error occurred. Please try again later.';
      });
}
//
function sendToTheDatabaseTheSettings(emailAgree, phoneAgree){

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const name = tempName;
  const phone = tempPhone;
  const type = tempType;

  //const date = now.Date();

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
          window.location.href = "../General/homePage.html";
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          alert("An error occurred. Please try again later.");
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
          //associationCell.textContent = donationDetails.association;
          associationCell.textContent = "#####";
          statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;

          tempNumber[donationDetails.num] = i++;
          const createdAt = new Date(donationDetails.createdAt);
          const lifetimeHours = 5; // Assuming 5-hour lifetime

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
          scrollToModal();
        });
      } else {
        console.log('No donation data available.');
        closeShowAllDonationModal();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//
function showAllDeleteDonation() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    let lineNum = 1;
    // Fetch the donation data from the server based on the user's email
    fetch(`http://localhost:3001/getAllDeleteDonation?email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(data => {
        //const table = document.getElementById('tableDonationshow_id');
        const tableBody = document.getElementById('tableDeleteDonationshow_body');
  
        // Clear existing table body content
        tableBody.innerHTML = '';
  
        // Check if donations data exists and is an array
        if (Array.isArray(data.donations)) {
          // Create table rows and populate with data
          data.donations.forEach(donationDetails => {
            const row = tableBody.insertRow();
            //const radioCell = row.insertCell();
            const numCell = row.insertCell();
            const dateCreateCell = row.insertCell();
            const dateDeleteCell = row.insertCell();
            const locationCell = row.insertCell();
            const associationCell = row.insertCell();
            const statusCell = row.insertCell();
            const itemsCell = row.insertCell();
            const reasonCell = row.insertCell();
  
            /* const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'donationRadio';
            radioInput.value = donationDetails.num;
            radioCell.appendChild(radioInput); */
  
            //numCell.textContent = donationDetails.num;
            numCell.textContent = lineNum++;
            dateCreateCell.textContent = donationDetails.dateMade;
            dateDeleteCell.textContent = donationDetails.dateDelete;
            locationCell.textContent = donationDetails.location;
            //associationCell.textContent = donationDetails.association;
            associationCell.textContent = "#####";
            //statusCell.textContent = donationDetails.status;
            statusCell.textContent = "#####";
            itemsCell.textContent = donationDetails.numItems;
            reasonCell.textContent = donationDetails.delivered;
         
            scrollToModal();
          });
        } else {
          console.log('No donation data available.');
          closeShowAllDelelteDonationModal();
        }
      })
      .catch(error => {
        console.log(error);
      });
}
//
function displayContactMen() {
  
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    console.log("email: ", email);
    let numline = 1;
    // Fetch the contact men data from the server
    fetch(`http://localhost:3001/getAllContactMan?email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('tablecontactmanshow_body');
  
        //console.log("data: ", data);
        // Clear existing table body content
        tableBody.innerHTML = '';
        if (Array.isArray(data.contactMen)) {
          // Create table rows and populate with data
          data.contactMen.forEach(contactManDetails => {
            const row = tableBody.insertRow();
            //const radioCell = row.insertCell();
            const numCell = row.insertCell();
            const nameCell = row.insertCell();
            const phoneCell = row.insertCell();
            const ruleCell = row.insertCell();
           
            // const radioInput = document.createElement('input');
            // radioInput.type = 'radio';
            // radioInput.name = 'donationRadio';
            // radioInput.value = donationDetails.num;
            // radioCell.appendChild(radioInput);
  
            numCell.textContent = numline++;
            nameCell.textContent = contactManDetails.name;
            phoneCell.textContent = contactManDetails.phone;
            ruleCell.textContent = contactManDetails.role;
         
            scrollToModal();
          });
        } else {
          console.log('No contact man available.');
          closeShowAllContactManModal();
        }
      })
      .catch(error => {
        console.log(error);
      });
}
//
function displaySurplusFoodPopup(num) {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
 
  // Generate the content for the popup
  let popupContent = '<div class="popup-window">';
  //popupContent += '<h3>Surplus Food Items</h3>';
  popupContent += `<h3>Surplus Food Items - Donation ${tempNumber[num]}</h3>`;
  popupContent += '<hr>';

  // Make an HTTP request to fetch the donation items from the server
  fetch(`http://localhost:3001/getDonationItems?email=${encodeURIComponent(email)}&num=${encodeURIComponent(num)}`)
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

      // Open a new window with the popup content
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const popupWidth = 400;
      const popupHeight = 600;
      const leftPosition = (screenWidth - popupWidth) / 8;
      const topPosition = (screenHeight - popupHeight) / 3;

      const cssStyle = '<link rel="stylesheet" type="text/css" href="popup.css"/>';

      popupWindow = window.open('', 'Surplus Food Items', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
      popupWindow.document.write(`<html><head><title>Surplus Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);

      tempPopup = popupWindow;
      console.log("temp: " + tempPopup);
    })
    .catch(error => {
      console.log('Error fetching donation items:', error);
    });
}
/***************************************END*************************************/