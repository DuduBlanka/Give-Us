//button
const showItemsBtn = document.getElementById('showitems_id');
const deleteDonationBtn = document.getElementById("deletedonation_id");
const backBtn = document.getElementById("backhome_id");
//const showItemsBtn = document.getElementById("showitem");  
//const deleteDonationBtn = document.getElementById("deletedonation");

/////////////////////////////////////////////////////////////////////////////////
//form
const formDisplayDonation = document.getElementById('form-table');
const formFinalDeleteDonation = document.getElementById('form-finaldeletedonation');
const formReturnHomePage = document.getElementById('form-return_id');

/////////////////////////////////////////////////////////////////////////////////////////
//select
//const pickUpContactMan = document.getElementById('contactmanselect');

//////////////////////////////////////////////////////////////////////////////////////////
//modal
const deleteDonationModal = document.getElementById('deletedonationmodal_id');
const returnModal = document.getElementById('returnmodal_id');

//////////////////////////////////////////////////////////////////////////////////////
//button modal
//const viewItemsBtn = document.getElementById('showitem_id');
//const deleteBtn = document.getElementById('deletedonation_id');

////////////////////////////////////////////////////////////////
//modal button
const deleteYesBtn = document.getElementById('delete-yes');
const deleteNoBtn = document.getElementById('delete-no');
//
const returnYesBtn = document.getElementById('return-yes');
const returnNoBtn = document.getElementById('return-no');

////////////////////////////////////////////////////////////////////////////////
//viewItemsBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
//deleteBtn.addEventListener('click', () => handleDeleteBtnModalChoice('delete'));
//
deleteYesBtn.addEventListener('click', () => handleDeleteDonationModalChoice('yes'));
deleteNoBtn.addEventListener('click', () => handleDeleteDonationModalChoice('no'));
//
returnYesBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoBtn.addEventListener('click', () => handleReturnModalChoice('no'));

///////////////////////////////////////////////////////////////////////////////
//var
let flag =0 ;
let surplusFoodItems = [];
let surplusFoodReports = 0;
let popupContent = '';
let popupWindow;
var tempPopup = '';
var flag1 = 0;
let flagOpenWindowView = 0;
let flagOpenWindowDelete = 0;
let tempNumber = [];

////////////////////////////////////////////////////////////////////////////////////
// Function to close the popup window
function closePopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}

///////////////////////////////////////////////////////////////////////////////
//button action
backBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagOpenWindowDelete === 1){
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  closePopupWindow();
  window.location.href = window.location.href = 'homePageSmallOrg.html?username=' + encodeURIComponent(username);
});
//
showItemsBtn.addEventListener("click", function(event) {
  event.preventDefault();

  if(flagOpenWindowDelete === 1){
    return;
  }
  const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
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
deleteDonationBtn.addEventListener("click", function() {
  event.preventDefault();
  if(flagOpenWindowDelete === 0){
    const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
    if (selectedDonation ) {
      //const donationNumber = selectedDonation.value;
      
    const radioButtons = document.querySelectorAll('input[name="donationRadio"]');
    // Enable all radio buttons
    radioButtons.forEach(function(radio) {
      radio.disabled = true;
    });
      flagOpenWindowDelete = 1;
      openDeleteDonationModal();
    } else {
      console.log('No donation selected.');
      alert("Please select a donation to delete");
    }
  }else{
    alert("Close delete window before");
  }
});

///////////////////////////////////////////////////////////////////////////////
//
function openDeleteDonationModal() {
  if (deleteDonationModal) {
    deleteDonationModal.style.display = 'block';
  }
}
function closeDeleteDonationModal() {
  if (deleteDonationModal) {
    deleteDonationModal.style.display = 'none';
  }
}
/* function openDeleteReasonDonationModal() {
  if (deleteReasonDonationModal) {
    deleteReasonDonationModal.style.display = 'block';
  }
}
function closeDeleteReasonDonationModal() {
  if (deleteReasonDonationModal) {
    deleteReasonDonationModal.style.display = 'none';
  }
} */
//
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
///////////////////////////////////////////////////////////////////
//
function handleDeleteDonationModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    closeDeleteDonationModal();
    deleteDonationFromDatabase();
    //openDeleteReasonDonationModal();
    flag = 0;
  } else {
    // User clicked "No"
    event.preventDefault();
    const disabledRadios = document.querySelectorAll('input[name="donationRadio"]:disabled');
    // Enable the disabled radio buttons
    disabledRadios.forEach(function(radio) {
      radio.disabled = false;
    })
    closeDeleteDonationModal();
    flagOpenWindowDelete = 0;
  }
}
/*function handleDeleteReasonDonationModalChoice(choice) {

  if (choice === 'choose') {
    // User clicked "Yes"
    event.preventDefault();
    closeDeleteReasonDonationModal();
    deleteDonationFromDatabase();
    flag = 0;
  } 
} */
//
function handleReturnModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    closePopupWindow();
    closeReturnModal();
    window.location.href = 'homePageSmallOrg.html?username=' + encodeURIComponent(username);
  } else {
    // User clicked "No"
    event.preventDefault();
    closeReturnModal();
    flagOpenWindowDelete = 0;
    //closeDisplayDonationModal();
  }
}

////////////////////////////////////////////////////////////////////////////////
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
      const table = document.getElementById('tableDonationshow_id');
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
          radioInput.name = 'donationRadio';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput);

          //numCell.textContent = donationDetails.num;
          numCell.textContent = lineNum++;
          dateCell.textContent = donationDetails.date;
          locationCell.textContent = donationDetails.location;
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
function deleteDonationFromDatabase() {

  let selectedDonation = document.querySelector('input[name="donationRadio"]:checked');

  if (selectedDonation) {
    const num = selectedDonation.value;

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');

    // const selectElement = document.getElementById('selectreason_id');
    // const selectedIndex = selectElement.selectedIndex;

    // let delivered = selectElement.options[selectedIndex].text;

    // Retrieve all details about the donation
    fetch(`http://localhost:3001/getDonationDetails?email=${email}&num=${num}`)
      .then(response => response.json())
      .then(data => {
        // Delete the donation from the database

        const num= data.num;
        const name= data.name;
        const location= data.location;
        const association= data.association;
        const type = data.type;
        const dateMade= data.date;
        const numItems= data.numItems;
        const food= data.food;

        let dateTime = new Date();
        const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        
        const dateDelete = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;
        
        const delivered = "Deleted By Owner";
        
        const deleteData = {
          num,
          name,
          email,
          location, 
          association,
          type,
          dateMade,
          dateDelete,
          delivered,
          numItems,
          food,
        };

        const deleteDonation = {
          num,
          email,
        };

        // Perform the deletion
        fetch(`http://localhost:3001/deleteDonationDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deleteDonation),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data); // Update response from the server
            if (data) {
              console.log("delete list!!!");
              // Save the deleted donation in the delete list
              fetch(`http://localhost:3001/createDonationDetailsInDeleteList`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteData),
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data); // Update response from the server
                  // Handle success response, e.g., display a success message
                  if(data.message){
                    openReturnModal();
                    selectedDonation = null;
                    selectedIndex = -1;
                    flagOpenWindowDelete = 0;
                    showAllDonation();
                  }
                })
                .catch(error => {
                  console.log(error); // Error message
                  // Handle error, e.g., display an error message
                  alert("Failed to save deleted donation in the delete list. Please try again later.");
                });
            }
          })
          .catch(error => {
            console.log(error); // Error message
            // Handle error, e.g., display an error message
            alert("Failed to delete donation. Please try again later.");
          });
      })
      .catch(error => {
        console.log(error); // Error message
        // Handle error, e.g., display an error message
        alert("Failed to retrieve donation details. Please try again later.");
      });
  }
}

//
function displaySurplusFoodPopup(num) {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
  let index = tempNumber[num];
  console.log("email client: " + email);
  // Generate the content for the popup
  let popupContent = '<div class="popup-window">';
  //popupContent += '<h3>Surplus Food Items</h3>';
  popupContent += `<h3>Surplus Food Items - Donation ${index}</h3>`;
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
    })
    .catch(error => {
      console.log('Error fetching donation items:', error);
    });
}
/************************************************END****************************************************************** */
