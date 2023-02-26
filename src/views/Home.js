import { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {cleanup} from "@testing-library/react";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
      currentJob: null,
      title: "",
      location: "",
      filterJob: null
    };

    this.showActiveJobHandler = this.showActiveJobHandler.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.jobFilterHandler = this.jobFilterHandler.bind(this)
  }

  componentDidMount() {
    (async () => {
      console.log("api", this.props.api)
      axios
        .get(`${this.props.api}/job`)
        .then((res) => res.data)
        .then((data) => {
          this.setState({ jobs: data })
          this.setState({ currentJob: this.jobFilterHandler()[0] })

        })
        .catch((err) => console.log(err));
    })();
  }


  showActiveJobHandler (e) {
    const jobIndex = e.currentTarget.dataset.index
    this.setState({currentJob: this.state.jobs[jobIndex]})

  }

  inputHandler (e, title) {
    this.setState({...this.state, [title]: e.target.value})
    this.setState({currentJob: null})
  }

  jobFilterHandler () {
    return  this.state.jobs?.filter(job => (job.title.toLowerCase().includes(this.state.title.toLowerCase()) && job.location.toLowerCase().toLowerCase().includes(this.state.location.toLowerCase()) ));
  }
  render() {
    const { title, desc, location, jobType, salary, link, _id } = this.state.currentJob || {};
    return (
        <>

          <div className="container-fluid border-bottom border-1 py-5">
            <div className="container">
              <form className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-5">
                  <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Username</label>
                  <div className="input-group">
                    <div className="input-group-text bg-transparent border-end-0 border-secondary">What</div>
                    <input type="text" className="form-control border border-start-0 border-secondary rounded-end mb-0" id="specificSizeInputGroupUsername"
                           placeholder="job title, keyword, or company" onChange={(e) =>{ this.inputHandler(e, "title")}} value={this.state.title}  />
                  </div>
                </div>
                <div className="col-sm-5">
                  <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Username</label>
                  <div className="input-group">
                    <div className="input-group-text bg-transparent border-end-0 border-secondary">Where</div>
                    <input type="text" className="form-control border border-start-0 border-secondary rounded-end mb-0" id="specificSizeInputGroupUsername"
                           placeholder="Osun" onChange={(e) => { this.inputHandler(e, "location")}} value={this.state.location}  />
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className="container-fluid pt-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 mb-3 mb-sm-0">

                  {
                   this.jobFilterHandler()?.map((job, i) => (
                        <div className="card mb-2" key={i}>
                          <div className="card-body">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text">{job.desc}</p>
                            <div className="d-flex flex-row justify-content-between">
                              <Link to={`/job/apply/${job._id}`} className="btn btn-primary">Apply Now</Link>
                              <button type="button" className="btn btn-outline-success" data-index={i}
                                onClick={this.showActiveJobHandler}
                              >More Detail</button>
                            </div>
                          </div>
                        </div>
                    ))
                  }
                </div>


                { this.state.currentJob && <div className="col-sm-6 ">
                  <div className="card" style={{height: '500px'}}>
                    <div className="card-header py-4 bg-white border-bottom border-2 shadow">
                      <h5 className="card-title">{title}</h5>
                      {link &&
                          <Link to="/company" className="card-link text-decoration-none">Link to company website</Link>}
                      <p className="card-text mb-0 text-dark fw-bold">{location}</p>
                      <p className="text-dark fw-bold">{`${salary}`}</p>
                      <Link to={`/job/apply/${_id}`} className="btn btn-primary">Apply now</Link>
                    </div>
                    <div className="card-body p-0 overflow-auto">
                      <div className="job-detail border-bottom border-1 p-3">
                        <h4 className="text-dark fw-bold">Job detail</h4>
                        <p className="text-dark fw-bold mb-0">Salary</p>
                        <p className="card-text">{`#${salary}`}</p>

                        <p className="text-dark fw-bold mb-0">Job Type</p>
                        <p className="card-text">{jobType}</p>
                      </div>
                      <div className="full-job-detail p-3">
                        <p className="text-dark fw-bold mb-0">Full description</p>
                        <p className="card-text">{desc}</p>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </>

    );
  }
}

export default Home;
