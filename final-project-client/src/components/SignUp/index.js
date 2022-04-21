
import React, {useRef} from 'react';
import * as service from '../../services/auth-service';
import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "../../contexts/profile-context.js";

const Signup = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    // const roleRef     = useRef()
    const navigate = useNavigate()
    const {signup} = useProfile()
    const handleSignup = async () => {
        try {
            await signup(
                usernameRef.current.value,
                passwordRef.current.value,
                'Fan'
            )
            navigate('/profile/' + usernameRef.current.value);
        } catch (e) {
            alert('oops')
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <form>
                <div>
                    <h3 className = "d-flex justify-content-center">Sign Up</h3>
                </div>
                <div className="form-outline mb-4">
                    <input ref={usernameRef} id="username" className="form-control" type="username"/>
                    <label className="form-label" htmlFor="username">Username</label>
                </div>
                <div className ="form-outline mb-4">
                    <input ref={passwordRef} id="password" className="form-control" type="password"/>
                    <label className="form-label" htmlFor="password">Password</label>
                </div>

                <hr/>

                <div>
                    <button type="button" onClick={handleSignup} className="btn btn-primary btn-block mb-4">
                        Sign Up
                    </button>
                </div>

                <div className="text-center">

                    <p>Already a member? <Link to="../signin">Sign In</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;