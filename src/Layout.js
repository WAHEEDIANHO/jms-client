import { useLocation, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import CreateJob from "./views/CreateJob";
import JobApplication from "./views/JobApplication";
import StaffReport from "./views/StaffReport";
import UserProfile from "./views/UserProfile";
import Footer from "./components/Footer";
import About from "./views/About";
import AddUser from "./views/AddUser";
import JobApplicationReport from "./views/JobApplicationReport";
import JobReport from "./views/JobReport";
import Application from "./views/Application";

function Layout({ api, email }) {
  const { pathname } = useLocation();
  const { id } = useParams();

  const render = () => {
    console.log(api)
    let page;
    switch (pathname) {
      case "/":
        page = <Home api={api} />;
        break;

      case `/job/apply/${id}`:
        page = <JobApplication title={"User"} api={api} />;
        break;

      case `/job/${id}`:
        page = <CreateJob api={api} />;
        break;


      case "/add-job":
        page = <CreateJob api={api} />;
        break;

      case "/signup":
        page = <AddUser title={"Staff"} api={api} />;
        break;

      case "/staff_report":
        page = <StaffReport api={api} />;
        break;

      case "/jobs_report":
        page = <JobReport api={api} />;
        break;


      case `/job/${id}/applications`:
        page = <JobApplicationReport api={api} />;
        break;


      case `/user/${id}`:
        page = <UserProfile api={api} id={id} />;
        break;



      case "/about":
        page = <About api={api} email={email} />;
        break;

      default:
        page = (
          <h2 className="text-danger text-center">
            Oops!!! There is nothing here: 404!
          </h2>
        );
        break;
    }

    return page;
  };

  return (
    <>
      <div className="section pb-5">
        <Navbar />
        {render()}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
