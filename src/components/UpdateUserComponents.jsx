import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";



const UpdateUserComponents = () => {

        const navigate = useNavigate();

        let { id } = useParams();

        const [user, setUser] = useState({
            id: "",
            name: "",
            email: "",
            phone: ""
        });

        const [actionResponse, setActionResponse] = useState({
            p_out: "",
            p_error_code: "",
            p_error_message: ""
        });

        const loaduser = async () => {
            const result = await axios.get(`http://localhost:8081/api/users/${id}`);
            console.log(result);
            setUser(result.data);
        }

        useEffect (() => {
            loaduser();
        },[]);

        const handleInputChange = (event) => {
            console.log('inside handleInputChange() mnethod.');
    
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            console.log('name: ' + name);
            console.log('value: ' + value);
    
            setUser(prevUser => ({
                ...prevUser,
                [name]: value
            }));
    
        };

        const basicValidation = (actionType) => {
            if (actionType === 'update-users') {
                if (user.name && user.email && user.phone) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };

        const handleUpdate = async (event) => {

            event.preventDefault();
            console.log('inside handleUpdate() method.');
    
            if (basicValidation('update-users')) {
                //perform add operation
                await axios.put(`http://localhost:8081/api/users/${id}`,user)
                .then(response => {
    
                    setActionResponse(prevResponse => ({
                        ...prevResponse,
                        p_out: "1", p_error_code: "VALIDATION-111", p_error_message: "Successful!"
                    }));
                    navigate('/users')
    
                }).catch(err => {
                    console.log(err);
                    setActionResponse(prevResponse => ({
                        ...prevResponse,
                        p_out: "0", p_error_code: "AJAX-000", p_error_message: "Unexpected Error Occured While Adding User !"
                    }));
                });
            }
            else {
                setActionResponse(prevResponse => ({
                    ...prevResponse,
                    p_out: "0", p_error_code: "VALIDATION-000", p_error_message: "Data Can't be Empty!"
                }));
            }
    
        };

        const addMarginBottom = {
            marginBottom: "20px"
        };
    
        return (
            <div>
                <h2>Update User Information </h2>
                {actionResponse.p_out && actionResponse.p_out === "1" ? <Alert variant="success">
                    {actionResponse.p_error_message}
                </Alert> : actionResponse.p_out && actionResponse.p_out === "0" ? <Alert variant="danger">
                    {actionResponse.p_error_message}
                </Alert> : ""}

                <form onSubmit={(e) => handleUpdate(e)}>

                    <div className="form-group" style={addMarginBottom}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" name="name" className="form-control" value={user.name} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <div className="form-group" style={addMarginBottom}>
                        <label htmlFor="price">Email:</label>
                        <input id="price" type="text" name="email" className="form-control" value={user.email} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <div className="form-group" style={addMarginBottom}>
                        <label htmlFor="price">Phone:</label>
                        <input id="price" type="text" name="phone" className="form-control" value={user.phone} onChange={(e) => handleInputChange(e)} />
                    </div>

                    <button type="submit" className="btn btn-success" id="btnUpdate">Update</button>

                </form>
            </div>
        );
    };
    
export default UpdateUserComponents;