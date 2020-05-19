import React, { Fragment, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Link, Redirect } from 'react-router-dom';

const Login = () => {
    // Konsumera context
    const { authData, dispatch } = useContext(AuthContext);
    const { alertDispatch } = useContext(AlertContext);

    // State
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        const loginResult = login(email, password, dispatch);
        loginResult.then(function(result) {
            if(!result) {
                setAlert('Login failed', 'danger', alertDispatch);
            }
        });
        
    }

    // Om användare är inloggad
    if(authData.isAuthenticated === true ) {
        return <Redirect to='/dashboard' />
    }

    return (
       <Fragment>
           <section className="container">
            <div className="form-container">
                <h2 className="form-header">Sign in</h2>
                <h3 className="sub-header"><i className="fas fa-user"></i> Sign in to your account</h3>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="Email">Email:</label><br />
                        <input
                            type="email"
                            id="Email"
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password:</label><br />
                        <input
                            type="password"
                            id="Password"
                            minLength="6"
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            required  />
                    </div>
                    <input type="submit" className="btn btn-dark btn-login" value="Sign in" />
                </form>
                <p className="signup">
                    Don't have an account? <Link to="/register" title="Go to register page" className="btn btn-red btn-create">Register</Link>
                </p>
            </div>
        </section>
       </Fragment>
    )
}

export default Login;
