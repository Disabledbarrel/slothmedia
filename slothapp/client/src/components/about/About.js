import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import VinylShelf from '../../img/vinyl-shelf.jpg';

const About = () => {
    return (
        <Fragment>
            <section className="container">
                <div className="concept bg-primary about-concept">
                    <div className="concept-text info-text">
                        <h2 className="about-header">About SlothMedia</h2>
                        <p>SlothMedia's vision is to make listening to music easier. That's why we've made our music service.
                                Our music player makes it possible to listen to music from many different sources in just one application.
                        </p>
                        <p>
                        Our music player supports playing a variety of URLs, including YouTube, Facebook, Twitch, SoundCloud,
                        Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.
                        </p>
                        <p>
                        <Link to="/terms" title="Go to terms page" className="terms-link">Read our Terms Of Use and Privacy Policy</Link>
                        </p>
                        <p>
                            <Link to="/register" title="Go to register page" className="btn btn-red btn-create">Register</Link>
                        </p>
                    </div>
                </div>

                <div className="about bg-dark about-info">
                    <div className="about-text">
                        <h2 className="about-header">How it works</h2>
                        <p>
                            Enjoy endless advertising-free music. Create a playlist and start adding songs to it. Adding songs
                            is super easy. Go to your playlist and click "Add song". Write the name of the song in the input field
                            "Song name". Then just copy the song URL from the source (e.g. Youtube or Soundcloud) and paste it in 
                            in the input field "Song URL". Click "Add song" and you're done!                        
                        </p>
                        <p>
                            Once you've created a playlist you can choose to share it with another SlothMedia user. 
                            Just click the share-icon next to the playlist in your Dashboard. Write the name of the user in the input field "User name" and click "Share". Done!
                            Once a user has access to your playlist, they can also add songs to it.
                        </p>
                    </div>
                    <img className="about-img about-pic" src={VinylShelf} alt="img of a record player" />
                </div>
                
            </section>
            
            
        </Fragment>
    )
}

export default About;
