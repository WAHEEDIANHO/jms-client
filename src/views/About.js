import "../css/about.css";

function About() {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-4 mt-5 text-white">
            <div className="card p-4 text-muted rounded-4 shadow">
              <h3>Project Topic</h3>
              <p>
                Design and implementation of a Web based Job Management
                System Using ReactJS, NodeJs & MongoDB
              </p>
              <div className="bio">
                <p className="text-dark fw-bold">Ariwodola Emmanuel Segun</p>
                <p className="text-dark fw-bold">HC20200206079</p>
                <p>HND II</p>
                <p>COMPUTER SCIENCE</p>

                <h6>Supervised By</h6>
                <p className="text-dark fw-bold">MR. NWAEKPE O.C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
