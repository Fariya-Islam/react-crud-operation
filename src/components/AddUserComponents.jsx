import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddUserComponents = () => {

        const navigate = useNavigate();

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

        const basicValidation = (actionType) => {
            if (actionType === 'add-users') {
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

        const handleAdd = (event) => {
            event.preventDefault();
            if (basicValidation('add-users')) {
                //perform add operation
                axios({
                    url: 'http://localhost:8081/api/users',
                    method: 'post',
                    data: user
                }).then(response => {
    
                    setActionResponse(prevResponse => ({
                        ...prevResponse,
                        p_out: "1", p_error_code: "VALIDATION-111", p_error_message: "Successful!"
                    }));
                    setUser(prevUser => {
                        return {
                            ...prevUser,
                            id: "", name: "", email: "", phone: ""
                        }
                    });
    
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
    
        return (
            <div>
                <h2>Add New User</h2>
                        {actionResponse.p_out && actionResponse.p_out === "1" ? <Alert variant="success">
                            {actionResponse.p_error_message}
                        </Alert> : actionResponse.p_out && actionResponse.p_out === "0" ? <Alert variant="danger">
                            {actionResponse.p_error_message}
                        </Alert> : ""}

                        <form onSubmit={(e) => handleAdd(e)}>

                            <div className="form-group" style={addMarginBottom}>
                                <label htmlFor="name">Name:</label>
                                <input id="name" type="text" name="name" className="form-control" value={user.name} onChange={(e) => handleInputChange(e)} />
                            </div>

                            <div className="form-group" style={addMarginBottom}>
                                <label htmlFor="price">Email:</label>
                                <input id="price" type="text" name="email" className="form-control" value={user.email} onChange={(e) => handleInputChange(e)} />
                            </div>

                            <div className="form-group" style={addMarginBottom}>
                                <label htmlFor="phone">Phone:</label>
                                <input id="phone" type="text" name="phone" className="form-control" value={user.phone} onChange={(e) => handleInputChange(e)} />
                            </div>

                            <button type="submit" className="btn btn-success" id="btnAdd">Save</button>
                            <button type="back" className="btn btn-primary" onClick={() => navigate('/users')} id="btnback">Back</button>

                        </form>
            </div>
        );
    };
    
export default AddUserComponents;