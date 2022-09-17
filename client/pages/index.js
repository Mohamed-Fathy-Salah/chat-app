const LandingPage = ({ currentUser }) => {
  return (
    <div>
      <h1>{JSON.stringify(currentUser)}</h1>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const data = await client.get('/auth/currentUser')
    console.log(data)
    return {currentUser: data.data};
};

export default LandingPage;
