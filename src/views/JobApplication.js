import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../components/Loader";
import Guide from "../components/Guide";

import "../css/login.css";
import {useParams} from "react-router-dom";

function JobApplication({ title, api }) {
  const [application, setApplication] = useState({});
  const [applyJob, setApplyJob] = useState(null);
  const [loader, setLoader] = useState(false);

  const { id } = useParams();
  console.log(id)

  const applicationHandler = (e) => {
    e.preventDefault();
    console.log("Submitting application")

    setLoader(true);

    const data = application;
    data.jobId = applyJob._id
    console.log("user date", data)

    axios
      .post(`${api}/job/apply`, data, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
        },
      })
      .then((res) => {
        setApplication({
          firstname: "",
          lastname: "",
          qualification: "",
          phone: "",
          address: "",
          email: "",
          gender: "",
        });
        setLoader(false);
        Swal.fire({
          title: "Successful",
          text: "Job application successful",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        alert("oops! error while submitting form \n please try again");
        setLoader(false);
      });
  };

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  useEffect(( ) => {
    axios.get(`${api}/job/${id}`)
        .then((res) => {
          setApplyJob(res.data);
          console.log(res.data)
        })
  }, [])


  return (
    <>
      {loader ? <Loader /> : null}
      <div className="container-fluid">
        <Guide>
          <h3>
            {/*Register {title} into <strong>JMS</strong>*/}
            Job Application
          </h3>
          <p className="mb-4">Job Management System</p>
        </Guide>
        {/* onSubmit={submit} */}
        <div className="container pt-5">
          <form className="row g-3" onSubmit={(e) => applicationHandler(e)}>
            <div className="row m-0 p-0">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control bg-danger opacity-25 text-white border-0"
                  disabled={true}
                  name="jobId"
                  // onChange={handleChange}
                  // value={user.sname ? user?.sname : ""}
                  value={applyJob?.title}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Location
                </label>
                <input
                  type="email"
                  className="form-control bg-danger opacity-25 text-white border-0"
                  disabled
                  // onChange={handleChange}
                  name="location"
                  // value={user.email ? user?.email : ""}
                  value={applyJob?.location}
                />
              </div>

            </div>

            <div className="col-md-4">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>

              <input
                type="tel"
                className="form-control"
                onChange={handleChange}
                name="firstname"
                id="firstname"
                value={application.firstname ? application?.firstname : ""}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="firstname" className="form-label">
                Last Name
              </label>

              <input
                type="tel"
                className="form-control"
                onChange={handleChange}
                name="lastname"
                id="lastname"
                value={application.lastname ? application?.lastname : ""}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">
                Phone No
              </label>

              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="phone"
                id="phone"
                value={application.phone ? application?.phone : ""}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                name="email"
                id="email"
                value={application.email ? application?.email : ""}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>

              <select
                name="gender"
                id="gender"
                className="form-select"
                onChange={handleChange}
                value={application.gender ? application?.gender : ""}
              >
                <option value="">select gnder</option>
                <option value="male">M</option>
                <option value="female">F</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="qualification" className="form-label">
                Qualification
              </label>

              <select
                name="qualification"
                id="qualification"
                className="form-select"
                onChange={handleChange}
                value={application.qualification ? application?.qualification : ""}
              >
                <option value="">select qualification</option>
                <option value="ssce">SSCE</option>
                <option value="nd">ND</option>
                <option value="hnd">HND</option>
                <option value="bsc">B. SC</option>
                <option value="other">others</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                id="address"
                name="address"
                placeholder="1234 Main St"
                value={application.address ? application?.address : ""}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-lg btn-success w-100 mt-3">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobApplication;
