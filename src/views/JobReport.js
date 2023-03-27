import React, {useEffect, useState} from "react";
import axios from "axios";
import Report from "../components/Report";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Guide from "../components/Guide";
import Search from "../components/Search";
import EditBtn from "../components/EditBtn";
import DeleteBtn from "../components/DeleteBtn";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const JobReport = ({api}) => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSeacrch] = useState("");
    const navigate = useNavigate()

    // fetch data
    const getJob = async () => {
        const config = {
            headers: {
                authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
            },
        };

        // "https://crms-api.herokuapp.com/api/v1/criminal",
        const res = await axios.get(`${api}/job`, config);
        console.log(res.data)
        return res.data;
    };

    useEffect(( ) => {
        (async function() {
            const fetchJob = async () => {
                try {
                    const res = await getJob();
                    console.log(res )
                    setJobs([...res ])
                    setLoading(false)
                    // console.log(jobs);
                } catch (err) {
                    setLoading(false);
                }
            };
            await fetchJob();
        })()
    }, [])

    function handeleSearch(e) {
        setSeacrch(e.target.value);
    }

    function handleDelete(e) {
        const { id } = e.target.dataset;
        setLoading( true );
        axios
            .delete(`${api}/job/${id}`, {
                headers: {
                    authorization: `bearer ${sessionStorage.getItem("cms_token")}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                console.log(res.id);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Job Deleted successfully',
                    showConfirmButton: false,
                    timer: 3000
                })
                setJobs([
                    jobs.filter((job) => job._id !== res.id),
                ]);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Ooops!",
                    text: 'error while submitting form \n please try again',
                    showConfirmButton: false,
                    timer: 3000
                })
                // alert("oops! error while submitting form \n please try again");
                setLoading(false);
            });
    }

    function filterList(search) {
        let result = jobs.filter(
            ({ title }) =>
                title?.toLowerCase().includes(search.toLowerCase())
        );
        return result;
    }

    const renderReport = () => (
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
            <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Deadline</th>
                <th>Qualification</th>
                <th>Salary</th>
                <th>Application</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {jobs.length !== 0 ? (
                filterList(search).map((job, i) => (
                <tr key={i}>
                    <td>
                        <p className="text-muted mb-0">{job.title}</p>
                    </td>
                    <td>
                        <p className="text-muted mb-0">{job.location}</p>
                    </td>
                    <td>
                        <p className="text-muted mb-0">{job.jobType}</p>
                    </td>
                    <td className="text-muted">{new Date(job.deadline).toLocaleDateString()}</td>
                    <td className="text-muted">{job.qualification}</td>
                    <td className="text-muted">{job.salary}</td>
                    <td className="text-muted">
                        <button className="btn btn-sm btn-warning text-white"
                        onClick={() => {
                            navigate(`/job/${job._id}/applications`, {
                                state: job.applications
                            })
                        }}
                        >
                            view application {job.applications.length}
                        </button>
                    </td>
                    <td>
                        <EditBtn pre={"job"} id={job._id} />
                        {sessionStorage.getItem("isAdmin") === "true" ? (
                            <DeleteBtn id={job._id} handleDelete={handleDelete} />
                        ) : null}
                    </td>
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

export default JobReport