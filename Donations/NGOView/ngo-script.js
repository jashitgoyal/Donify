document.addEventListener("DOMContentLoaded", function () {
  const addDonationBtn = document.getElementById("add-donation-btn");
  const manageDonationsBtn = document.getElementById("manage-donations-btn");
  const trackDonationsBtn = document.getElementById("track-donations-btn");
  const dashboardContent = document.getElementById("dashboard-content");

  // Modal Elements
  const addDonationModal = document.getElementById("add-donation-modal");
  const closeModal = document.querySelector(".close");
  const donationForm = document.getElementById("donation-form");

  // Event Listeners for Modal
  addDonationBtn.addEventListener("click", () => {
    addDonationModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    addDonationModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addDonationModal) {
      addDonationModal.style.display = "none";
    }
  });

  // Handle donation form submission
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newDonation = {
      ngoName: document.getElementById("ngoName").value,
      description: document.getElementById("description").value,
      amount: document.getElementById("amount").value,
      deadline: document.getElementById("deadline").value,
      location: document.getElementById("location").value,
      category: document.getElementById("category").value,
    };

    console.log("New Donation Request:", newDonation);

    // TODO: Send this data to the server or store it in a database
    alert("Donation request submitted successfully!");

    addDonationModal.style.display = "none";
  });

  // Manage Donations
  manageDonationsBtn.addEventListener("click", () => {
    dashboardContent.innerHTML =
      "<h2>Manage Your Donations</h2><p>List of donations will be displayed here...</p>";

    // TODO: Fetch and display the donations specific to the NGO
  });

  // Track Donations
  trackDonationsBtn.addEventListener("click", () => {
    dashboardContent.innerHTML =
      "<h2>Track Donations</h2><p>Donation statistics and tracking will be shown here...</p>";

    // TODO: Display donation tracking details like total donations received, etc.
  });
});
