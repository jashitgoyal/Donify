document.addEventListener("DOMContentLoaded", function () {
  const addDonationBtn = document.getElementById("add-donation-btn");
  const manageDonationsBtn = document.getElementById("manage-donations-btn");
  const trackDonationsBtn = document.getElementById("track-donations-btn");
  const dashboardContent = document.getElementById("dashboard-content");

  // Modal Elements
  const addDonationModal = document.getElementById("add-donation-modal");
  const closeModal = document.querySelector(".close");
  const donationForm = document.getElementById("donation-form");

  // Initialize donations array
  let donations = [];

  // Load initial data
  loadDonations();

  // Event Listeners for Modal
  addDonationBtn.addEventListener("click", () => {
    addDonationModal.style.display = "block";
  });

  closeModal.addEventListener("click", closeModalHandler);
  window.addEventListener("click", (event) => {
    if (event.target === addDonationModal) {
      closeModalHandler();
    }
  });

  // Handle donation form submission
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newDonation = {
      ngoName: document.getElementById("ngoName").value,
      description: document.getElementById("description").value,
      amount: parseInt(document.getElementById("amount").value),
      deadline: document.getElementById("deadline").value,
      location: document.getElementById("location").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      category: document.getElementById("category").value,
      status: "Pending", // Default status for new donations
    };

    // Save donation to local storage
    saveDonation(newDonation);

    alert("Donation request submitted successfully!");
    closeModalHandler();
    loadDonations(); // Refresh the list
  });

  // Load donations from local storage
  function loadDonations() {
    const storedDonations = localStorage.getItem("donations");
    if (storedDonations) {
      donations = JSON.parse(storedDonations); // Load from local storage
      displayDonations();
    }
  }

  // Save donation to local storage
  function saveDonation(donation) {
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
  }

  // Close modal handler
  function closeModalHandler() {
    addDonationModal.style.display = "none";
    donationForm.reset(); // Reset form fields
  }

  // Display donations made by the specific NGO
  function displayDonations() {
    dashboardContent.innerHTML = ""; // Clear existing content
    const filteredDonations = donations; // Change this to filter by specific NGO if needed

    dashboardContent.innerHTML += "<h2>Donation Requests</h2>";
    filteredDonations.forEach((donation, index) => {
      dashboardContent.innerHTML += `
              <div class="donation-item">
                  <h3>${donation.ngoName} (${donation.category})</h3>
                  <p>${donation.description}</p>
                  <p>Amount: ₹${donation.amount} | Deadline: ${donation.deadline}</p>
                  <p>Status: ${donation.status}</p>
                  <button onclick="editDonation(${index})">Edit</button>
                  <button onclick="removeDonation(${index})">Remove</button>
              </div>`;
    });
  }

  // Manage Donations view
  manageDonationsBtn.addEventListener("click", () => {
    displayDonations();
  });

  // Edit donation
  window.editDonation = function (index) {
    const donation = donations[index];
    document.getElementById("ngoName").value = donation.ngoName;
    document.getElementById("description").value = donation.description;
    document.getElementById("amount").value = donation.amount;
    document.getElementById("deadline").value = donation.deadline;
    document.getElementById("location").value = donation.location;
    document.getElementById("phoneNumber").value = donation.phoneNumber;
    document.getElementById("category").value = donation.category;
    addDonationModal.style.display = "block";

    donationForm.onsubmit = function (event) {
      event.preventDefault();
      // Update the donation
      const updatedDonation = {
        ngoName: document.getElementById("ngoName").value,
        description: document.getElementById("description").value,
        amount: parseInt(document.getElementById("amount").value),
        deadline: document.getElementById("deadline").value,
        location: document.getElementById("location").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        category: document.getElementById("category").value,
        status: donation.status, // Maintain the original status
      };

      donations[index] = updatedDonation;
      localStorage.setItem("donations", JSON.stringify(donations));
      alert("Donation updated successfully!");
      closeModalHandler();
      loadDonations(); // Refresh the list
    };
  };

  // Remove donation
  window.removeDonation = function (index) {
    donations.splice(index, 1); // Remove from array
    localStorage.setItem("donations", JSON.stringify(donations));
    loadDonations(); // Refresh the list
  };
});
