function generateValidationNumber(username, raceId) {
  const seed = username + raceId;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const character = seed.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function createTicketImage(username, date, price, validationNumber, raceId, raceName, raceLocation) {
  const canvas = document.getElementById("ticket-canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 800;
  canvas.height = 250.62;

  // Draw background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw border
  ctx.strokeStyle = "#000";
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Load left side image
  const leftImage = new Image();
  leftImage.src = "../assets/images/ticket_base.png";
  leftImage.crossOrigin = "Anonymous";

  leftImage.onload = function () {
    // Draw left image
    ctx.drawImage(leftImage, 5, 5, 790, canvas.height - 10);

    // Load QR code image
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationNumber}`;
    const qrCodeImage = new Image();

    var numeroIngresso = localStorage.getItem("ticketNumber");
    if (!numeroIngresso) {
      numeroIngresso = Math.floor(Math.random() * 100);
      localStorage.setItem("ticketNumber", numeroIngresso);
    }

    qrCodeImage.crossOrigin = "Anonymous"; // Ensures the image can be used on the canvas

    qrCodeImage.onload = function () {
      // Draw QR code image
      ctx.drawImage(qrCodeImage, canvas.width - 144, canvas.height / 2 - 50, 100, 100); // Adjust the position and size as needed

      // Add text
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.font = "20px Creepster";
      ctx.fillText(`Ticket ${numeroIngresso}`, canvas.width / 2 + 35, 33);
      ctx.fillText(date.toUpperCase(), canvas.width / 2 + 35, 120);
      ctx.font = "25px Nosifer";
      ctx.fillText(raceName, canvas.width / 2 + 35, 160);
      ctx.font = "20px Creepster";
      ctx.fillText(username, canvas.width / 2 + 35, 220);
      ctx.font = "12px Creepster";
      ctx.fillText(raceLocation + " - R$" + price, canvas.width / 2 + 35, canvas.height - 8);

      // Additional info on the right
      ctx.font = "13px Creepster";
      ctx.fillText(date.toUpperCase(), canvas.width - 95, 30);
      ctx.fillText("Validar Pagamento", canvas.width - 95, 50);
      ctx.fillText("#" + validationNumber, canvas.width - 95, canvas.height / 2 + 70);

      // Convert canvas to image
      const dataURL = canvas.toDataURL("image/png");
      const img = new Image();
      img.src = dataURL;

      // Display the image
      const ticketContainer = document.getElementById("ticket-container");
      ticketContainer.innerHTML = "";
      ticketContainer.appendChild(img);

      // Create download link
      const downloadLink = document.getElementById("download-link");
      downloadLink.href = dataURL;
      downloadLink.style.display = "block";
    };

    qrCodeImage.src = qrCodeUrl;
  };
}

const userName = localStorage.getItem("name");

document.getElementById("ticket-text").textContent = `${
   userName.split(" ")[0]
}, seu ingresso foi reservado! Finalize o pagamento para validar seu convite`;
document.getElementById("pix-link").textContent = `Pagar Ingresso (R$25)`;

const quantity = "1";
const date = "31/10/2025";
const price = quantity * 25;
const eventName = "Beco da Abóbora";
const raceLocation = "Rua Ceará, 1646";
const id = "123";

const validationNumber = generateValidationNumber(userName, id);

createTicketImage(userName, date, price, validationNumber, id, eventName, raceLocation);
