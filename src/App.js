import React from 'react';

let tempArr = [];

export default class Home extends React.Component {

  state = { // initial state
    loading: true, // waiting for our connection to the API to end
    response: null, // empty array that we will use to append our fetched data
    arr: []
  };

  async componentDidMount() {
    let url = "https://jsonplaceholder.typicode.com/users";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    data.forEach(function(x) {tempArr.push(x.username)})
    this.setState({response: data, arr: tempArr, loading: false}) // loading the data has ended, so I can overwrite the initial state
  };

  render() {
    return(
      <div className="home">
        {this.state.loading || !this.state.response ? ( // using this as a loading indicator
          <div className="home__loading">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="home__container">
            <form autoComplete="off">
              <input id="myInput" type="text" name="myName" placeholder="Start typing to see suggestions"></input>
            </form>
            {this.state.response.map(
              function(x) {
                return (
                  <div key={x.id}>{x.username}</div>
                )
              })}
          </div>
        )}
      </div>
    );
  };
}