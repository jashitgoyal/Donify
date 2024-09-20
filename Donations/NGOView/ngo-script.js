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

  // Load initial data
  loadDonations();

  // Handle donation form submission
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newDonation = {
      ngoName: document.getElementById("ngoName").value,
      description: document.getElementById("description").value,
      amount: parseInt(document.getElementById("amount").value),
      deadline: document.getElementById("deadline").value,
      location: document.getElementById("location").value,
      category: document.getElementById("category").value,
    };

    // Save donation to local storage
    saveDonation(newDonation);

    alert("Donation request submitted successfully!");
    addDonationModal.style.display = "none";
    loadDonations(); // Refresh the list
  });

  // Manage Donations
  manageDonationsBtn.addEventListener("click", loadDonations);

  // Track Donations
  trackDonationsBtn.addEventListener("click", trackDonations);

  // Load donations from local storage
  function loadDonations() {
    const storedDonations = JSON.parse(localStorage.getItem("donations")) || [];
    dashboardContent.innerHTML = "<h2>Manage Your Donations</h2>";

    // Create a list of donations
    const donationList = document.createElement("ul");
    storedDonations.forEach((donation, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${donation.ngoName}: ${donation.description} - ₹${donation.amount}`;
      donationList.appendChild(listItem);

      // Add a remove button for each donation
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeDonation(index);
      });
      listItem.appendChild(removeButton);
    });

    dashboardContent.appendChild(donationList);
  }

  // Save donation to local storage
  function saveDonation(donation) {
    const storedDonations = JSON.parse(localStorage.getItem("donations")) || [];
    storedDonations.push(donation);
    localStorage.setItem("donations", JSON.stringify(storedDonations)); // Update local storage
  }

  // Remove donation from local storage
  function removeDonation(index) {
    const storedDonations = JSON.parse(localStorage.getItem("donations")) || [];
    storedDonations.splice(index, 1); // Remove the donation
    localStorage.setItem("donations", JSON.stringify(storedDonations)); // Update local storage
    loadDonations(); // Refresh the list
  }

  // Track donations (simple statistics)
  function trackDonations() {
    const storedDonations = JSON.parse(localStorage.getItem("donations")) || [];
    dashboardContent.innerHTML = "<h2>Track Donations</h2>";

    const totalDonations = storedDonations.length;
    const totalAmount = storedDonations.reduce(
      (acc, donation) => acc + donation.amount,
      0
    );

    dashboardContent.innerHTML += `<p>Total Donations: ${totalDonations}</p>`;
    dashboardContent.innerHTML += `<p>Total Amount Requested: ₹${totalAmount}</p>`;
  }
});
