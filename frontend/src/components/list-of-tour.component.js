import React, { Component } from "react";
import Datatable from "react-bs-datatable";
import UserService from "../services/user.service";
import TourDataService from "../services/tour.service"; 

export default class ListOfTour extends Component{
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
                <header>
                    <h3><strong>{content.message}</strong></h3>
                </header>
                <Datatable
                    tableHeaders={this.header}
                    tableBody={items}
                    keyName="userTable"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 15, 20, 30]}
                    initialSort={{ prop: "username", isAscending: true }} />
            </div>
        );
        }
    }
}