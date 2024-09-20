// Switch between login and signup forms
document.getElementById("showLogin").addEventListener("click", function () {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  this.classList.add("active");
  document.getElementById("showSignup").classList.remove("active");
});

document.getElementById("showSignup").addEventListener("click", function () {
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  this.classList.add("active");
  document.getElementById("showLogin").classList.remove("active");
});

// Fetch users data from JSON file
let usersData = [];

fetch("users.json")
  .then((response) => response.json())
  .then((data) => {
    usersData = data.users;
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Handle login
document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Check if the user exists in the JSON data
  const user = usersData.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert(`Login successful as ${user.type}!`);
    if (user.type === "normal") {
      window.location.href = "../Donations/UserView/index.html"; // Redirect normal users
    } else if (user.type === "organization") {
      window.location.href = "../Donations/NGOView/dashboard.html"; // Redirect organizations
    }
  } else {
    alert("Invalid username or password!");
  }
});

// Handle signup
document.getElementById("signup").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;

  // Check if the username already exists
  const existingUser = usersData.find((user) => user.username === username);

  if (existingUser) {
    alert("Username already exists. Please choose a different one.");
  } else if (username && password && userType) {
    // Add new user to the usersData array (in a real application, you'd send this data to the server)
    usersData.push({ username, password, type: userType });

    alert("Signup successful!");
    if (userType === "normal") {
      window.location.href = "../Donations/UserView/index.html"; // Redirect normal users
    } else if (userType === "organization") {
      window.location.href = "../Donations/NGOView/dashboard.html"; // Redirect organizations
    }
  } else {
    alert("Please complete all fields!");
  }
});
