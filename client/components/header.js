import Link from "next/link";
import { useRouter } from "next/router";
import useContext from "react";
import { AuthContext } from "../context/AuthContext";

const Header = ({ currentUser }) => {
  const router = useRouter();
  const { logout, error } = useContext(AuthContext);
  const handleLogout = () => {
    logout();

    if (error) {
      console.error(error);
    }

    router.push("/");
  };

  const links = [
    !currentUser && {
      label: "Sign Up",
      onclick: () => {
        router.push("/auth/signup");
      },
    },
    !currentUser && {
      label: "Sign In",
      onclick: () => {
        router.push("/auth/signin");
      },
    },
    currentUser && { label: "Sign Out", onclick: handleLogout() },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, onclick }) => {
      return (
        <li key={label} className="nav-item">
            <a className="nav-link" onClick={onclick}>{label}</a>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
