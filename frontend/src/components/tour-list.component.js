import React, { Component } from "react";
import TourDataService from "../services/tour.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class TourList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTour = this.retrieveTour.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTour = this.setActiveTour.bind(this);
    this.removeAllTour = this.removeAllTour.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tour: [],
      currentTour: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTour();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTour() {
    TourDataService.getUser(AuthService.getCurrentUser().id)
      .then(response => {
        this.setState({
          tour: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTour();
    this.setState({
      currentTour: null,
      currentIndex: -1
    });
  }

  setActiveTour(tour, index) {
    this.setState({
      currentTour: tour,
      currentIndex: index
    });
  }

  removeAllTour() {
    console.log("tets");
    TourDataService.deleteUser(AuthService.getCurrentUser().id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TourDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tour: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tour, currentTour, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tours List</h4>

          <ul className="list-group">
            {tour &&
              tour.map((arc, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTour(arc, index)}
                  key={index}
                >
                  {arc.title}
                </li>
              ))}
          </ul>

          <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllTour}>
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTour ? (
            <div>
              <h4>Tour</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTour.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTour.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTour.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tour/" + currentTour.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tour...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
