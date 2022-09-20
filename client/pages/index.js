import Chat from "./chat/index";
const LandingPage = ({ currentUser }) => {
  return currentUser ? <Chat /> : <h1>sign in/up first</h1>;
};

export default LandingPage;
