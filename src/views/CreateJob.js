import { useState, useEffect } from "react";
import FormData from "form-data";
import axios from "axios";
import "../css/login.css";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

import Guide from "../components/Guide";

function CreateJob({ api }) {
  const [job, setJob] = useState({});
  const [loader, setLoader] = useState(false);
  const [job_id, setJobID] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${api}/job`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
        },
      });
      console.log("gotten data", data)
      setJobID(`JMS${(data.length + 1).toString().padStart(3, 0)}`);
      // return data.length;
    })();
  }, []);

  const addJob = (e) => {
    e.preventDefault();
    setLoader(true);

    const data = job;
    data.job_id = job_id
    console.log(data)


    axios
      .post(`${api}/job`, data, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
        },
      })
      .then((res) => {
        setJob({
          title: "",
          company: "",
          location: "",
          email: "",
          qualification: "",
          hireDuration: "",
          noOfEmployee: "",
          salary: "",
          deadline: "",
          jobType: "",
          desc: ""
        });
        setLoader(false);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job added successfully',
          showConfirmButton: false,
          timer: 3000
        })
        // alert("New Criminal added successfully");
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "Ooops!",
          text: 'error while submitting form \n please try again',
          showConfirmButton: false,
          timer: 3000
        })
        // alert("oops! error while submitting form \n please try again");
        setLoader(false);
      });
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {loader ? <Loader /> : null}

      <div className="container-fluid">
        <Guide>
          <h3>
            Add Job into <strong>JMS</strong>
          </h3>
          <p className="mb-4">Job Management System</p>
        </Guide>
        {/* onSubmit={submit} */}
        <div className="container">
          <form className="row g-3" onSubmit={addJob}>
            <div className="row justify-content-end mb-5">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Job ID
                </label>
                <input
                  disabled
                  type="text"
                  name="text"
                  className="form-control my-auto my-auto border-0 border-bottom rounded-0"
                  value={job_id ? job_id : ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Job Title
              </label>
              <input
                  id="title"
                type="text"
                className="form-control"
                name="title"
                onChange={handleChange}
                value={job.title ? job?.title : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="company" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                className="form-control"
                name="company"
                onChange={handleChange}
                value={job.company ? job?.company : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                location
              </label>
              <input
                type="text"
                id="location"
                className="form-control"
                name="location"
                onChange={handleChange}
                value={job.location ? job?.location : ""}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={job.email ? job?.email : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="qualification" className="form-label">
                Qualification
              </label>
              <input
                  type="text"
                  className="form-control"
                  id="qualification"
                  name="qualification"
                  onChange={handleChange}
                  value={job.qualification ? job?.qualification : ""}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="hireDuration" className="form-label">
                Hire Duration
              </label>
              <input
                type="text"
                className="form-control"
                id="hireDuration"
                name="hireDuration"
                onChange={handleChange}
                value={job.hireDuration ? job?.hireDuration : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="noOfEmployee" className="form-label">
                Number of Employee
              </label>
              <input
                type="text"
                id="noOfEmployee"
                className="form-control"
                id="noOfEmployee"
                name="noOfEmployee"
                onChange={handleChange}
                value={job.noOfEmployee ? job?.noOfEmployee : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="number"
                className="form-control"
                id="salary"
                name="salary"
                onChange={handleChange}
                value={job.salary ? job?.salary : ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                type="Date"
                className="form-control"
                id="deadline"
                name="deadline"
                onChange={handleChange}
                value={job.deadline ? job?.deadline : ""}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="jobType" className="form-label">
                Job Type
              </label>

              <select
                name="jobType"
                id="jobType"
                className="form-select"
                onChange={handleChange}
                value={job.jobType ? job?.jobType : ""}
              >
                <option value="">select job type</option>
                <option value="full time">Fulltime</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="desc" className="form-label">
                Job Description
              </label>

              <textarea
                  name="desc"
                  id="desc"
                  className="form-control form-text" rows={3}
                  onChange={handleChange}
                  value={job.desc ? job?.desc : ""}
              />
            </div>


            <div className="col-12">
              <button type="submit" className="btn btn-lg btn-success w-100 mt-3">
                Register Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJob;
