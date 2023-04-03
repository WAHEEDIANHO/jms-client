// import { useEffect } from "react";

import "../css/footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center text-lg-start">
      {/* <!-- Copyright --> */}
      <div
        className="text-center py-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
          {(new Date).getFullYear()} Job Management System <br />
        HC20200206079 <br />
        Supervised By <strong>MR.NWAEKPE O.C</strong>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  );
}

export default Footer;
