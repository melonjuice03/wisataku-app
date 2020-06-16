import React, { Component } from "react";
import TourDataService from "../services/tour.service";

export default class Tour extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTour = this.getTour.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTour = this.updateTour.bind(this);
    this.deleteTour = this.deleteTour.bind(this);

    this.state = {
      currentTour: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTour(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTour: {
          ...prevState.currentTour,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTour: {
        ...prevState.currentTour,
        description: description
      }
    }));
  }

  getTour(id) {
    console.log(id);
    TourDataService.get(id)
      .then(response => {
        this.setState({
          currentTour: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTour.id,
      title: this.state.currentTour.title,
      description: this.state.currentTour.description,
      published: status
    };

    TourDataService.update(this.state.currentTour.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTour: {
            ...prevState.currentTour,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTour() {
    TourDataService.update(
      this.state.currentTour.id,
      this.state.currentTour
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tour was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTour() {    
    TourDataService.delete(this.state.currentTour.id).then(response => {
        console.log(response);
        this.props.history.push('/tour')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTour } = this.state;

    return (
      <div>
        {currentTour ? (
          <div className="edit-form">
            <h4>Tour</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTour.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTour.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTour.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTour.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTour}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTour}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tour...</p>
          </div>
        )}
      </div>
    );
  }
}
