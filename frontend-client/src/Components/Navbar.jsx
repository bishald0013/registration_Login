import { Link } from "react-router-dom";
import { getToken } from "../services/LocalStorage";

function Navbar() {
  const token = getToken();

  return (
    <div>
      <header className="container mt-5">
        <nav class="navbar navbar-expand-lg bg-none">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="contact" className="nav-link" href="#">
                    Contact
                  </Link>
                </li>

                {token ? (
                  <li className="nav-item">
                    <Link to="dashbord" className="nav-link active">
                      Dashbord
                    </Link>
                  </li>
                ) : (
                  <div className="collapse navbar-collapse" id="navbarNav" >
                    {" "}
                    <li className="nav-item">
                      <Link to="Login" className="nav-link active">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="signeup" className="nav-link active">
                        SigneUp
                      </Link>
                    </li>{" "}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
