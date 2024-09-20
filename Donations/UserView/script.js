document.addEventListener("DOMContentLoaded", function () {
  const donationCardsContainer = document.getElementById("donation-cards");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");
  const searchBar = document.getElementById("search-bar");
  const categoryFilter = document.getElementById("category-filter");
  const locationFilter = document.getElementById("location-filter");

  let donations = [];

  // Load donation data from the JSON file first
  async function loadDonations() {
    try {
      const response = await fetch("../SharedData/donations.json");
      const jsonDonations = await response.json();
      donations = jsonDonations; // Load from JSON first

      // Now check local storage and merge if needed
      const storedDonations = localStorage.getItem("donations");
      if (storedDonations) {
        const localDonations = JSON.parse(storedDonations);
        donations = [...donations, ...localDonations]; // Merge JSON donations with local storage donations
      }

      loadDonationCards();
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  }

  // Load cards based on filters
  function loadDonationCards() {
    donationCardsContainer.innerHTML = "";
    const filteredDonations = donations.filter((donation) => {
      return (
        donation.amount <= priceFilter.value &&
        (categoryFilter.value === "all" ||
          donation.category === categoryFilter.value) &&
        (locationFilter.value === "all" ||
          donation.location === locationFilter.value) &&
        (donation.ngoName
          .toLowerCase()
          .includes(searchBar.value.toLowerCase()) ||
          donation.description
            .toLowerCase()
            .includes(searchBar.value.toLowerCase()))
      );
    });

    filteredDonations.forEach((donation) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
              <h2>${donation.ngoName}</h2>
              <p>${donation.description}</p>
              <p><strong>Amount:</strong> ₹${donation.amount}</p>
              <p><strong>Deadline:</strong> ${donation.deadline}</p>
              <p><strong>Location:</strong> ${donation.location}</p>
              <p><strong>Category:</strong> ${donation.category}</p>
              <p><strong>Contact:</strong> 
                <a href="tel:${donation.phoneNumber}" style="color: blue; text-decoration: underline;">
                  ${donation.phoneNumber}
                </a>
              </p>
          `;
      donationCardsContainer.appendChild(card);
    });

    if (filteredDonations.length === 0) {
      donationCardsContainer.innerHTML = "<p>No matching donations found.</p>";
    }
  }

  // Update price display and filter results when the price slider changes
  priceFilter.addEventListener("input", () => {
    priceValue.textContent = `₹${priceFilter.value}`;
    loadDonationCards();
  });

  // Filter donations by search, category, and location
  searchBar.addEventListener("input", loadDonationCards);
  categoryFilter.addEventListener("change", loadDonationCards);
  locationFilter.addEventListener("change", loadDonationCards);

  // Load data from the JSON file and local storage, then initially load the cards
  loadDonations();
});
