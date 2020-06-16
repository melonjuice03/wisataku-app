import React, { Component } from "react";
import TourDataService from "../services/tour.service";
import AuthService from "../services/auth.service";

export default class AddTour extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTour = this.saveTour.bind(this);
    this.newTour = this.newTour.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTour() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      userId : this.state.userId
    };

    TourDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          userId: response.data.userId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTour() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTour}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Tour Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                autoComplete="off"
              />
            </div>

            <button onClick={this.saveTour} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}