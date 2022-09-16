const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  // prevent from writing to file
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);

  // clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
						<p class="text">
        ${message.text}
						</p>`;

  chatMessages.appendChild(div);
}
