import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
   
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" class="nav-link px-2 text-white fs-6 fst-italic">
                Log_Reg
                </Link>
              </li>
              <li>
                <Link to="contact" class="nav-link px-2 text-white">
                  Contact
                </Link>
              </li>
            </ul>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                class="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <div class="text-end">
              <button type="button" class="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" class="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
