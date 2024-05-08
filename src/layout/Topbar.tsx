import { Container, Dropdown, Image, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Icon } from "@iconify/react";
import { logout as authLogout } from "src/redux/reducers/auth.reducer";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "src/service/firebase";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  function handleLogout() {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch(authLogout());
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  }
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="d-flex">
        <div className="container-fluid d-flex">
          <NavLink className="navbar-brand" to="/">
            {import.meta.env.VITE_APP_NAME}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/volunteer"
                >
                  Volunteer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects">
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/my-projects"
                >
                  My Projects
                </NavLink>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  background: "transparent",
                  padding: 0,
                  border: "none",
                }}
              >
                <Image
                  width={40}
                  height={40}
                  className="ms-2"
                  style={{ borderRadius: 50 }}
                  alt={user?.displayName}
                  src={user?.photoURL}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate("/projects")}
                  className="d-flex align-items-center"
                >
                  {" "}
                  <Icon
                    className="me-1"
                    icon="octicon:project-roadmap-24"
                  />{" "}
                  Projects
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/my-projects")}
                  className="d-flex align-items-center"
                >
                  <Icon className="me-1" icon="zondicons:news-paper" />
                  My Projects
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/profile")}
                  className="d-flex align-items-center"
                >
                  <Icon className="me-1" icon="mdi:user" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleLogout}
                  className="d-flex align-items-center border-top"
                >
                  <Icon className="me-1" icon="mdi:power" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
