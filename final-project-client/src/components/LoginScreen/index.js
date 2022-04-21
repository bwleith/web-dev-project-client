import React, {useRef} from 'react';
import * as service from '../../services/auth-service.js'
import {useNavigate, Link} from "react-router-dom";
import {useProfile} from "../../contexts/profile-context.js";

const LoginScreen = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const handleSignin = async () => {
        console.log('inside handleSignin')
        console.log('username: ', usernameRef.current.value);
        console.log('password: ', passwordRef.current.value);
        try {
            await signin(
                usernameRef.current.value,
                passwordRef.current.value
            )
            navigate("/profile/" + usernameRef.current.value)
        } catch (e) {
            alert('Invalid Credentials')
        }
    }

    return(
        <div>
            <div className = "d-flex justify-content-center">
                <form>

                    <div>
                        <h3 className = "d-flex justify-content-center">Sign In</h3>
                    </div>

                    <div className="form-outline mb-4">
                        <input ref={usernameRef} id="username" className="form-control"/>
                        <label className="form-label" htmlFor="username">Username</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input ref={passwordRef} type="password" id="password" className="form-control"/>
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>





                    <button type="button"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleSignin}
                    >
                        Sign in
                    </button>


                    <div className="text-center">

                        <p>Not a member? <Link to="../signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;