const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const x = await axios.post('http://localhost:3000/api/auth/signup', {name, email, password});

    if(x.status === 201) {
        window.location.href = "http://localhost:3000/chat.html";
    } else {
        alert("wrong creds");
    }
});
