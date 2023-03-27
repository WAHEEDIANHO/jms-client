import React, {useEffect, useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Search from "../components/Search";
import {useLocation} from "react-router-dom";

const JobApplicationReport = ({api}) => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSeacrch] = useState("");
    const { state } = useLocation();


    useEffect(( ) => {
        setApplications([...state])
        setLoading(false)

    }, [])

    function handeleSearch(e) {
        setSeacrch(e.target.value);
    }


    function filterList(search) {
        let result = applications.filter(
            ({ firstname, lastname }) =>
                firstname?.toLowerCase().includes(search.toLowerCase()) ||
                lastname?.toLowerCase().includes(search.toLowerCase())
        );
        return result;
    }

    const renderReport = () => (
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
            <tr>
                <th>Applicant name</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Desc</th>
            </tr>
            </thead>
            <tbody>
            {applications.length !== 0 ? (
                filterList(search).map((application, i) => (
                    <tr key={i}>
                        <td>
                            <p className="text-muted mb-0">{`${application.firstname} ${application.lastname}`}</p>
                        </td>
                        <td>
                            <p className="text-muted mb-0">{application.email}</p>
                        </td>
                        <td>
                            <p className="text-muted mb-0">{application.qualification}</p>
                        </td>
                        <td>{application.address}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5}>
                        <Error />
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );


    return (
        <>
            {loading ? <Loader /> : null}
            <Guide>
                <h3>
                    Job Report from <strong>JMS</strong>
                </h3>
                <p className="mb-4">Job Management System</p>
            </Guide>

            <div className="container">
                <Search handeleSearch={handeleSearch} />
                {renderReport()}
            </div>
        </>
    )
}

export default JobApplicationReport