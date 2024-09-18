const mainArea = document.getElementById("main-area");
const donationBtn = document.getElementById("new-donation");

function adder() {
  mainArea.insertAdjacentHTML("afterend", "<div>HI</div>");
}
console.log(donationBtn);
donationBtn.addEventListener("click", adder);
