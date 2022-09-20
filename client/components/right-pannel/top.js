const Top = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"
          alt="avatar"
          className="d-flex align-self-center me-3"
          width={60}
        />
      </div>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <li className="nav-item">
            <a className="nav-link">:</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Top;
