import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/auth';
import Home from '../routes/home';


export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <Router>
            <Switch>
                {isLoggedIn ?
                <>
                    <Route></Route>
                </>  : <Route>
                        <Auth />
                    </Route>}
            </Switch>
        </Router>
    )
}