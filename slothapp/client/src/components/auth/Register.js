import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const { name, email, password, confirmpassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmpassword) {
            console.log('Passwords do not match!');
        } else {
            console.log('Success!');
        }
    }

    return (
        <Fragment>
            <section className="container">
                <h2><i className="fas fa-user"></i> Create account</h2>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="Name">Name:</label><br />
                        <input
                            type="text"
                            id="Name"
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email:</label><br />
                        <input type="email"
                            id="Email"
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password:</label><br />
                        <input type="password"
                            id="Password"
                            minLength="6"
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ConfirmPassword">Confirm password:</label><br />
                        <input type="password"
                            id="ConfirmPassword"
                            minLength="6" 
                            name='confirmpassword'
                            value={confirmpassword}
                            onChange={e => onChange(e)}
                            required
                            />
                    </div>
                    <input type="submit" className="btn btn-red" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login" title="Go to sign in page" className="btn btn-dark">Log in</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Register;
