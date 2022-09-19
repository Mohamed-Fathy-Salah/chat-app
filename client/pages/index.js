const LandingPage = ({ currentUser }) => {
  return (
    <div>
      <h1>hi {JSON.stringify(currentUser)}</h1>
    </div>
  );
};

export default LandingPage;
