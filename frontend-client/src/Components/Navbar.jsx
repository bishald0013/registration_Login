import { Link } from "react-router-dom";

function Navbar() {
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
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link
                    to="/"
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="contact" class="nav-link" href="#">
                    Contact
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to='Login' class="nav-link active">Login</Link>
                </li>
                <li class="nav-item">
                  <Link to='signeup' class="nav-link active">SigneUp</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
