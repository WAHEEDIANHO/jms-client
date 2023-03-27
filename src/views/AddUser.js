import Guide from "../components/Guide";
import axios from "axios";
import Swal from "sweetalert2";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import Loader from "../components/Loader";

const AddUser = ({ api }) => {

    const [user, setUser] = useState({});
    const [loader, setLoader] = useState(false);
    const { pathname } = useLocation()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const addUser = (e) => {
        e.preventDefault();
        setLoader(true);

        const data = user;
        data.email = user.username
        console.log(data)


        axios
            .post(`${api}/user/signup`, data, {
                headers: {
                    authorization: `bearer ${sessionStorage.getItem("jms_token")}`,
                },
            })
            .then((res) => {
                setUser({
                    firstname: "",
                    lastname: "",
                    othername: "",
                    username: "",
                    phone: "",
                    address: "",
                    state: "",
                    city: "",
                    dob: "",
                    role: "",
                    gender: "",
                    company: ""
                });
                setLoader(false);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User added successfully',
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
                setUser({
                    firstname: "",
                    lastname: "",
                    othername: "",
                    username: "",
                    phone: "",
                    address: "",
                    state: "",
                    city: "",
                    dob: "",
                    role: "",
                    gender: "",
                    company: ""
                });
                setLoader(false);
            });
    };
    return (
        <>
            {loader ? <Loader /> : null}
            <div className="container-fluid">
                <Guide>
                    <h3>
                        Register User into <strong>JMS</strong>
                    </h3>
                    <p className="mb-4">Job Management System</p>
                </Guide>
                {/* onSubmit={submit} */}
                <div className="container">
                    <form className="row g-3" onSubmit={addUser}>

                        <div className="col-md-6">
                            <label htmlFor="firstname" className="form-label">
                                First Name
                            </label>
                            <input
                                id="firstname"
                                type="text"
                                className="form-control"
                                name="firstname"
                                onChange={handleChange}
                                value={user.firstname ? user?.firstname : ""}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastname" className="form-label">
                               Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                className="form-control"
                                name="lastname"
                                onChange={handleChange}
                                value={user.lastname ? user?.lastname : ""}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="othername" className="form-label">
                                othername
                            </label>
                            <input
                                type="text"
                                id="othername"
                                className="form-control"
                                name="othername"
                                onChange={handleChange}
                                value={user.othername ? user?.othername : ""}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                name="phone"
                                onChange={handleChange}
                                value={user.phone ? user?.phone : ""}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="username"
                                className="form-control"
                                name="username"
                                onChange={handleChange}
                                value={user.username ? user?.username : ""}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                className="form-control"
                                id="state"
                                name="state"
                                onChange={handleChange}
                                value={user.state ? user?.state : ""}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                onChange={handleChange}
                                value={user.city ? user?.city : ""}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">
                                Date of Birth
                            </label>
                            <input
                                type="Date"
                                className="form-control"
                                id="dob"
                                name="dob"
                                onChange={handleChange}
                                value={user.dob ? user?.dob : ""}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="role" className="form-label">
                                ROle
                            </label>

                            <select
                                name="role"
                                id="role"
                                className="form-select"
                                onChange={handleChange}
                                value={user.role ? user?.role : ""}
                            >
                                <option value="">select user type</option>
                                <option value="user">User</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">
                                Gender
                            </label>

                            <select
                                name="gender"
                                id="gender"
                                className="form-select"
                                onChange={handleChange}
                                value={user.gender ? user?.gender : ""}
                            >
                                <option value="">select gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                        </div>
                        { user?.role === "employee"  && <div classNamee="col-md-12">
                            <label htmlFor="company" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="company"
                                name="company"
                                onChange={handleChange}
                                value={user.company ? user?.company : ""}
                            />
                        </div>}
                        <div classNamee="col-md-12">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={user.address ? user?.address : ""}
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-lg btn-success w-100 mt-3">
                                { pathname.includes("employee") ? "Register Employee" : "Register User" }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser;