import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Vinyl from '../../img/vinyl_compressed.jpg';
import AppIllustration from '../../img/app_illustration.png';

const Landing = () => {
    return (
        <Fragment>
            <section className="landing">
                <div className="img-overlay">
                    <div className="landing-inner">
                        <h2>Connect<br />Your<br />Favorite<br />Music <i className="fas fa-square-full"></i></h2>
                    </div>
                </div>
            </section>
            <section className="information bg-white">
                <h3>Why Slothmedia?</h3>
                <div className="information-container-one">
                    <div className="icon-container">
                        <i className="fas fa-play-circle"></i>
                    </div>
                    <h4>Create your own playlists</h4>
                    <p>Use music from many sources</p>
                </div>
                <div className="information-container-two">
                    <div className="icon-container">
                        <i className="fas fa-headphones"></i>
                    </div>
                    <h4>No commercial breaks</h4>
                    <p>Just enjoy the music</p>
                </div>
                <div className="information-container-three">
                    <div className="icon-container">
                        <i className="fas fa-user-friends"></i>
                    </div>
                    <h4>Share your experience</h4>
                    <p>Let friends see what you listen to</p>
                </div>
            </section>
            <section className="concept bg-dark">
                <img className="concept-img" src={Vinyl} alt="img of a record player" />
                <div className="concept-text">
                    <h5>How it works</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio deleniti culpa, quod eius nesciunt vel aliquid tenetur,
                        ad iusto consequatur sed veniam architecto, harum officia cum quidem nemo
                        iure eos.</p>
                        <Link to="/about" className="btn btn-dark" title="Read more about how Slothmedia works">Read more</Link>
                </div>
            </section>
            <section className="about bg-primary">
                <div className="about-text">
                    <h5>SlothMedia anywhere, anytime</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio deleniti culpa, quod eius nesciunt vel aliquid tenetur,
                        ad iusto consequatur sed veniam architecto, harum officia cum quidem nemo
                        iure eos.</p>
                        <Link to="/about" className="btn btn-dark" title="Learn more about SlothMedia's app">Learn more</Link>
                </div>
                <img className="about-img" src={AppIllustration} alt="phone with slothmedia-app" />
            </section>
            <footer className="main-footer bg-dark">
                <div className="footer-inner bg-dark">
                    <Link to="/about" title="Learn more about SlothMedia's app">About</Link>
                    <Link to="/help" title="Go to our help page">Help</Link>
                    <p>&copy; 2020</p>
                </div>
            </footer>
        </Fragment>
    )
}

export default Landing;
