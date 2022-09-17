import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { user, logout, error, isLoading } = useContext(AuthContext);
  const [nav, setNav] = useState(<span>loading...</span>);

  useEffect(() => {
    if (user) {
      setNav(
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>
            logout
          </a>
        </li>
      );
    } else {
      setNav(
        <>
          <li className="nav-item">
            <Link href="/auth/signup">
              <a className="nav-link"> register </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/auth/signin">
              <a className="nav-link"> signin </a>
            </Link>
          </li>
        </>
      );
    }
  }, [isLoading, user]);

  const handleLogout = () => {
    logout();

    if (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{nav}</ul>
      </div>
    </nav>
  );
};

export default Header;
