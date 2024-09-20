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
      amount: parseInt(document.getElementById("amount").value),
      deadline: document.getElementById("deadline").value,
      location: document.getElementById("location").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      category: document.getElementById("category").value,
    };

    // Save donation to local storage
    saveDonation(newDonation);

    alert("Donation request submitted successfully!");
    addDonationModal.style.display = "none";
    loadDonations(); // Refresh the list
  });

  // Load donations from local storage
  function loadDonations() {
    const storedDonations = localStorage.getItem("donations");
    if (storedDonations) {
      donations = JSON.parse(storedDonations); // Load from local storage
      displayAnalytics();
      displayDonations();
    }
  }

  // Save donation to local storage
  function saveDonation(donation) {
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
  }

  // Display analytics for specific NGO
  function displayAnalytics() {
    const ngoName = donations[0]?.ngoName; // Assuming all donations are from the same NGO
    const filteredDonations = donations.filter(
      (donation) => donation.ngoName === ngoName
    );

    const totalDonations = filteredDonations.length;
    const totalAmount = filteredDonations.reduce(
      (acc, donation) => acc + donation.amount,
      0
    );

    document.getElementById("total-donations").textContent = totalDonations;
    document.getElementById("total-amount").textContent = `₹${totalAmount}`;
    document.getElementById("pending-donations").textContent = totalDonations; // Adjust if needed
  }

  // Display donations made by the specific NGO
  function displayDonations() {
    const ngoName = donations[0]?.ngoName; // Assuming all donations are from the same NGO
    const filteredDonations = donations.filter(
      (donation) => donation.ngoName === ngoName
    );

    dashboardContent.innerHTML += "<h2>Donation Requests</h2>";
    filteredDonations.forEach((donation) => {
      dashboardContent.innerHTML += `
                  <div class="donation-item">
                      <h3>${donation.ngoName} (${donation.category})</h3>
                      <p>${donation.description}</p>
                      <p>Amount: ₹${donation.amount} | Deadline: ${donation.deadline}</p>
                  </div>`;
    });
  }
});
