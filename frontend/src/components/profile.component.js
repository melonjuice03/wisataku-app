import React, { Component  } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component{    
    constructor(props){
        super(props);
        this.state = {
            currentUser : AuthService.getCurrentUser()
        }
    }

    render(){
        const {currentUser} = this.state;
        return(
            <div className="container">
                    <p><strong>Username : </strong>{currentUser.username}</p>
                    <hr></hr>
                <p>
                    <strong> ID : </strong>
                    {currentUser.id}
                </p>
                <hr></hr>
                <p>
                    <strong> Email : </strong>
                    {currentUser.email}
                </p>
                <hr></hr>
                <p>
                    <strong> Authorities : </strong>
                    <ul>
                        {currentUser.roles &&
                        currentUser.roles.map((role, index ) =><li key={index}>{role}</li>)
                        }
                    </ul>
                </p>
            </div>
        );
    }
}