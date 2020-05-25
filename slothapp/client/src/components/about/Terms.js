import React, { Fragment } from 'react';
import Policy from '../../img/privacy_policy.pdf';

const About = () => {
    return (
        <Fragment>
            <section className="container">
                <div className="concept bg-primary about-concept">
                    <div className="concept-text info-text">
                        <h2 className="about-header">Privacy Policy</h2>
                        <p>
                        By registering an account on our platform, you represent and warrant that you have read and agreed to our Privacy Policy.
                        </p>
                        <p>
                            <a href = {Policy} className="terms-link" title="Link to Privacy policy document" target = "_blank" rel="noopener noreferrer">Read our privacy policy</a>
                        </p>
                    </div>
                </div>

            </section>
            
            
        </Fragment>
    )
}

export default About;
