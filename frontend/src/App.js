import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Home from "./components/home.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import TourList from "./components/tour-list.component";
import Tour from "./components/tour.component";
import AddTour from "./components/add-tour.component";
import ListOfTour from "./components/list-of-tour.component";

class App extends Component{

    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard : false,
            showModeratorBoard : false,
            currentUser : undefined
        }
    }

    componentDidMount(){

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser : user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut(){
        AuthService.logout();
        window.location.href="/";
    }

    render(){
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return(
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-inner">
                        <Link to="/" className="navbar-brand">
                        Wisataku
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>

                            {showAdminBoard && (
                                  <li className="nav-item">
                                  <Link to="/admin" className="nav-link">
                                      Admin Board
                                  </Link>
                              </li>
                            )}

                            {showModeratorBoard && (
                                  <li className="nav-item">
                                  <Link to="/mod" className="nav-link">
                                      Moderator Board
                                  </Link>
                              </li>
                            )}

                            {currentUser && (                             
                             <li className="nav-item">
                               <Link to="/list" className="nav-link">
                                 Tour List
                               </Link>
                             </li>
                            )}

                            {currentUser && (
                               <li className="nav-item">
                               <Link to="/tour" className="nav-link">
                                 Edit Tours
                               </Link>
                             </li>
                              
                            )}

                            {currentUser && (                             
                             <li className="nav-item">
                               <Link to="/add" className="nav-link">
                                 Add Tour
                               </Link>
                             </li>
                            )}
                        </div>

                        {currentUser ? 
                        (
                        <div className="navbar-nav pull-right">
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={this.logOut}>
                                    Logout
                                </Link>
                            </li>

                        </div>
                            ) : (
                            <div className="navbar-nav  pull-right">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                            ) 
                        }
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/","/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/mod" component={BoardModerator}/>
                            <Route exact path="/admin" component={BoardAdmin}/>
                            <Route exact path= "/tour" component={TourList} />
                            <Route exact path="/add" component={AddTour} />
                            <Route exact path="/list" component={ListOfTour} />
                            <Route path="/tour/:id" component={Tour} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;