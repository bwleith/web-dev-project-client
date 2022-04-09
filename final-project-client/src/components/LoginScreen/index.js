const LoginScreen = () => {
    return(
        <div>
            <div className = "d-flex justify-content-center">
                <form>

                    <div>
                        <h3 className = "d-flex justify-content-center">Login Required</h3>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control"/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>


                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked/>
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>

                    </div>

                    <a href="home">
                        <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </a>

                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;