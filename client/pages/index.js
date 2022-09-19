//import Link from "next/link";

const LandingPage = ({ currentUser }) => {
    console.log("===> ", currentUser);
    return (
        <h1> hi {currentUser} </h1>
    );
};

export default LandingPage;
