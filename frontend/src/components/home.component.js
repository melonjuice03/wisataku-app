import React, { Component } from "react";
import UserService from "../services/user.service";
import TourDataService from "../services/tour.service";
import {BrowserRouter as Link } from 'react-router-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            content : "",
            error: null,
            isLoaded: false,
            items: []
        };

        this.header = [
            { title: "ID", prop: "id", sortable: true, filterable: true },
            {
              title: "User Name",
              prop:"username",
              sortable: true,
              filterable: true
            },
            { title: "Title", prop: "title", sortable: true, filterable: true },
            { title: "Description", prop: "description", sortable: true, filterable: true },
            { title: "Published Date", prop: "createdAt", sortable: true, filterable: true }
        ];   
    }

    componentDidMount(){
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content : response.data
                });
            },
            error => {
                this.setState({
                    content : (error.response && error.response.data ) 
                    || error.message || error.toString()
                });
            }
        );

        TourDataService.getPublished().then(
            response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    render(){
        const { content, error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            console.log(items);

        return(
            <div className="container">
                <header id="showcase">
                    <h1>Welcome To Wisataku</h1>
                        <p>Find The Beauty Of Indonesia With Wisataku</p>
                        <a href="#" className="button">
                            <Link to="/list" className="nav-link">
                                Tour list
                            </Link>
                        </a>
                    </header>
            </div>
        );
        }
    }
}