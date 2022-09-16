const signupForm = document.getElementById("signup-form");
const socket = io('ws://localhost:3000');

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.elements.username.value;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  axios
    .post("http://localhost:3000/api/auth/signup", { name, email, password })
    .then((val) => {
        //window.location.href = "http://localhost:3000/chat.html";
        socket.emit(
          "chatMessage",
            `${name}, ${email}, ${password}`
        );
        window.location.assign("http://localhost:3000/chat.html");
    })
    .catch((val) => {
      alert(val);
    });
});
