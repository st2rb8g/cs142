import React from "react";
import "./styles.css";

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:"",
    };
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );
    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(e) {
    this.setState({inputValue:e.target.value});
  }

  

  render() {
    let displayList;
    if(this.state.inputValue.length !== 0) {
      let inputPattern = new RegExp(this.state.inputValue, "i");
      let filteredList = window.cs142models.statesModel().filter(s => inputPattern.test(s));

      if(filteredList.length === 0) {
        displayList = (<p className="notfound">无匹配结果</p>);
      } else {
        displayList = <ul>{filteredList.sort().map((item, i) => (<li key={i} className="filtered">{item}</li>))}</ul>;
      }
    } else {
      displayList = <ul>{window.cs142models.statesModel().sort().map((item, i) => (<li key={i} className="filtered">{item}</li>))}</ul>;
    }
    return (
      <div>
        <label htmlFor="inStates">Input Field:</label>
        <input id="inStates" type = "text" value = {this.state.inputValue} onChange =  {this.handleChangeBound}/>
        <p className="entered">Typing: {this.state.inputValue}</p>
        {displayList}
      </div>
    );
  }
}

export default States;
