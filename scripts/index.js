var submitButton = document.getElementById("get-tickets");

submitButton.addEventListener("click", (e) => {
  const name = document.getElementById("name").value;

  sessionStorage.setItem("name", name);

  window.location.href = `../pages/ticket.html`;
});
