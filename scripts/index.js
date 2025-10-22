const submitButton = document.getElementById("get-tickets");
const userName = sessionStorage.getItem("name");

submitButton.addEventListener("click", (e) => {
   if (!userName) {
      const name = document.getElementById("name").value;
      sessionStorage.setItem("name", name); 
   }
   
   window.location.href = `./pages/ticket.html`;
});

if (userName) {
   document.getElementById("name").style.display = "none";
   document.getElementById("nameLabel").style.display = "none";

   submitButton.textContent = "Ver Ingresso"
}