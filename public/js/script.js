const messages = <%- JSON.stringify(messages) %>;
const itemsPerPage = 10;
let currentPage = 1;

function renderTable() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  for (let i = start; i < end && i < messages.length; i++) {
    const message = messages[i];
    const row = `
      <tr>
        <td>${message.id}</td>
        <td>${message.recipient}</td>
        <td>${message.message}</td>
        <td>${message.timestamp}</td>
        <td>${message.sender}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

function loadTable() {
  const tableBody = document.querySelector("tbody");
  const messageCountBadge = document.getElementById("messageCountBadge");
  const newMessage = document.getElementById("novaMensagem");

  fetch("/api/messages/?skip=0&take=10")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const messages = data.messages;
        const badgeCount = data.count;
        tableBody.innerHTML = "";

        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          const row = `
            <tr>
              <td>${message.id}</td>
              <td>${message.recipient}</td>
              <td>${message.message}</td>
              <td>${message.timestamp}</td>
              <td>${message.sender}</td>
            </tr>
          `;
          tableBody.innerHTML += row;
          messageCountBadge.innerHTML = badgeCount;
          newMessage.style.display = "none";
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao atualizar a tabela:", error);
    });
}

function updateNewMessage() {
  fetch("/api/messages/?skip=0&take=10")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const newMessage = document.getElementById("novaMensagem");
        const total = document.getElementById("messageCountBadge").innerText;

        if (total >= data.count) {
          return;
        } else {
          newMessage.style.display = "block";
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao atualizar a tabela:", error);
    });
}

const updateButton = document.getElementById("updateTable");
updateButton.addEventListener("click", loadTable);

function autoUpdateTable() {
  setInterval(function () {
    updateNewMessage();
  }, 3000);
}

renderTable();
autoUpdateTable();
