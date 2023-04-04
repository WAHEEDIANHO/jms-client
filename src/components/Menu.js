// import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  // const [token, setToken] = useState(() =>
  // sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  // );

  const menu = [
    { title: "Find jobs", path: "/" },
    { title: "About", path: "/about" },
      (sessionStorage.getItem("role") === "employee" || sessionStorage.getItem("isAdmin")) && { title: "Post Job", path: "/add-job" },
      sessionStorage.getItem("isAdmin") === "true" && {
          title: "Report",
          role: [
              { title: "User", path: "/staff_report" },
              { title: "Job", path: "/jobs_report" },
          ],
      },
    {
      title: sessionStorage.getItem("jms_token") ? "Sign out" : "Sign in",
      path: sessionStorage.getItem("jms_token") ? "/logout" : "/",
    },
  ].filter(el => el !== false);

  console.log(menu)

  const getDisplayMenu = (menuType) => {
    return menuType.map((el, i) => {
      if (el !== false && el?.role) {
        return (
          <li className="nav-item dropdown" key={i}>
            <Link
              className="nav-link dropdown-toggle"
              to={"#"}
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {el.title}
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {el.role.map((el, i) => (
                <li className="dropdown-item" key={i}>
                  <Link className="nav-link" to={el.path}>
                    {el.title}
                  </Link>
                  {el.isInnerRole ? (
                    <ul
                      className="dropdown-menu dropdown-submenu"
                      aria-labelledby="navbarDropdown"
                    >
                      {el.inner_role.map((el, i) => (
                        <li className="dropdown-item" key={i}>
                          <Link to={el.path} className="nav-link">
                            {el.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={i}>
            <Link to={el?.path} className="nav-link active" aria-current="page">
              {el?.title}
            </Link>
          </li>
        );
      }
    });
  };

  const navigation = (_) => getDisplayMenu(menu);

  return <ul className="navbar-nav me-auto mb-2 mb-lg-0">{navigation()}</ul>;
}

export default Menu;
