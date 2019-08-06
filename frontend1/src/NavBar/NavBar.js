import React from 'react';
import { Link , withRouter} from 'react-router-dom';
import auth0Clinent from '../Auth';

function NavBar (props){

    const signOut = () => {
        auth0Clinent.signOut();
        props.history.replace('/');
    }

    return(

            <nav className="navbar navbar-dark fixed-top bg-primary">
                <Link className="navbar-brand" to="/">
                    Q&A App
                </Link>

                {
                    !auth0Clinent.isAuthenticated() && 
                    <button className='btn btn-dark' onClick={auth0Clinent.signIn}>Sign In</button>
                }
                {
                    auth0Clinent.isAuthenticated() && 
                 <div>
                        <label className='mr-2 text-white'>{auth0Clinent.getProfile().name}</label>
                    <button className='btn btn-dark' onClick={() => {signOut()}}>Sign Out</button>
                 </div>
                }
            </nav>

    );
    
}

export default withRouter(NavBar);