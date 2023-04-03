import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

import Login from "./views/Login";
// import Preloader from "./components/Preloader";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: sessionStorage.getItem("jms_token"),
      api: "https://jms-5haa.onrender.com/api", //"http://localhost:7700/api/v1";
      // api: "http://localhost:3030/api", //"http://localhost:7700/api/v1";
    };
  }

  componentDidMount() {
    if (this.state.token)
      this.setCurrentUser(true, sessionStorage.getItem("jms_id"));
    // axios
    //   .post("http://localhost:3000/user", {
    //     firstname: "waheed",
    //     lastname: "safiu",
    //     email: "wa@gmail.com",
    //     roll: "dev",
    //   })
    //   .then(() => console.log("posted succesfully"))
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  setCurrentUser = (state = false, id) => {
    if (!state) return this.setState({ user: null });
    console.log(id)
    axios
      .get(`${this.state.api}/user/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        this.setState({ user: data });
        console.log(data.admin);
        sessionStorage.setItem("isAdmin", data.admin);
      }).catch((e) => {
        console.log(e.message, "is here")
    })
  };
  render() {
    const { token, api, user } = this.state;
    return (
      <Router>
        {/*<Preloader />*/}
        <Routes>
          <Route path="/login" element={<Login api={api}  />} />
          <Route path="/add-job" element={<Layout api={api}   />} />
          <Route path="/job/apply/:id" element={<Layout api={api}   />} />
          <Route path="/signup" element={<Layout api={api}   />} />
          <Route path="/logout" element={<Login setUser={this.setCurrentUser} api={api} />} />
          <Route path="/about" element={<Layout  api={api} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout user={"waheed"} token={token} api={api} />} />

              <Route path="/add-job" element={<Layout api={api} />}  />
              <Route path="/job/apply/:id" element={<Layout api={api} />}  />
              <Route path="/job/:id" element={<Layout api={api} />}  />
            <Route path="/jobs_report" element={<Layout api={api} />} />

            <Route path="/job/:id/applications" element={<Layout api={api} />} />

              <Route path="/user/:id" element={<Layout api={api} />} />
              <Route path="/staff_report" element={<Layout api={api} />} />


              {/*<Route path="/application_report" element={<Layout api={api} />} />*/}

              {/*<Route path="/about" element={<Layout />} />*/}
          </Route>
          <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
