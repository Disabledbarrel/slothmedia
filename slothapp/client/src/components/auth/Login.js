import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
       
        console.log(formData);
    }

    return (
       <Fragment>
           <section className="container">
            <h2><i className="fas fa-user"></i> Log in to your account</h2>
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
                <input type="submit" className="btn btn-dark" value="Log in" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register" title="Go to register page" className="btn btn-red">Register</Link>
            </p>
        </section>
       </Fragment>
    )
}

export default Login;
