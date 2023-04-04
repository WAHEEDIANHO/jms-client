import { useState, useEffect } from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";

import "../css/login.css";
function Login({ api, setUser }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isError, setIsError] = useState(false);

  useEffect((_) => {
    if (pathname === "/logout" && sessionStorage.getItem("jms_token")) {
      sessionStorage.clear();
      return navigate("/login");
    } else if (pathname === "/logout" && !sessionStorage.getItem("jms_token"))
      return navigate("/login");

    if (sessionStorage.getItem("jms_token") && pathname === "/login")
      return navigate("/");
  }, [pathname, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    // validation

    if (login.username === "") {
      document.querySelector("#username").classList.add("error");
      return;
    } else if (login.password === "") {
      document.querySelector("#password").classList.add("error");
      return;
    }

    try {
      let res = await axios.post(`${api}/user/login`, login);
      res = await res.data;
      console.log(res)
      sessionStorage.setItem("jms_token", res.token);
      sessionStorage.setItem("jms_id", res._id);
      sessionStorage.setItem("role", res.role);
      setUser(true, res._id);
    } catch (err) {
      setLogin({ username: "", password: "" });
      setIsError(true);
    }

    if (sessionStorage.getItem("jms_token")) {
      return navigate("/");
    }
  };

  return (

      <>
        <section className="vh-100">
          <div className="container-fluid top-50 start-50 position-absolute translate-middle">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="img-fluid" alt="Sample" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form method="post" onSubmit={submit}>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
                    {isError ? (
                                  <h5 className="fw-normal mb-3 pb-3 text-danger">
                                    Invalid credential
                                  </h5>
                                ) : null}

                   {/*Email input*/}
                  <div className="form-outline mb-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => {
                          setLogin({ ...login, username: e.target.value });
                          e.target.classList.remove("error");
                        }}
                        value={login.username ? login.username : ""}
                    />
                  </div>

                  {/*Password input*/}
                  <div className="form-outline mb-3">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                        }
                        value={login.password ? login.password : ""}
                    />
                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button className="btn btn-dark btn-lg w-100" type="submit">Login</button>
                    {/*<button type="button" className="btn btn-primary btn-lg"*/}
                    {/*        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login*/}
                    {/*</button>*/}
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup" className="link-danger">Register</Link></p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
      </>

  );
}

export default Login;
