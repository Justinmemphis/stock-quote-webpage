// started based off of this website: https://reactjs.org/docs/add-react-to-a-website.html
// also from here: https://reactjs.org/docs/forms.html
// also: https://stackoverflow.com/questions/58579975/how-to-invoke-a-component-on-handlesubmit-in-react
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// https://stackoverflow.com/questions/69698080/display-user-input-value-upon-submit-in-react

import React, { useState, StrictMode } from 'react'
import ReactDOM from 'react-dom'

export default function App() {
  const [enteredText, setEnteredText] = useState('')
  const [displayText, setDisplayText] = useState('')
  const textChangeHandler = (i) => {
    setEnteredText(i.target.value)
  }

  const submitHandler = (evernt) => {
    event.preventDefault()
    setDisplayText(enteredText)
    const x = enteredText
    console.log(x)
    setEnteredText('')
  }

  return (
    <div>
      <h1>Get user input</h1>
      <form onSubmit={submitHandler}>
        <input
          placeholder='type something'
          type='text'
          value={enteredText}
          onChange={textChangeHandler}
        />
        <button type='submit'>Submit</button>
      </form>
      <p>You just typed: {displayText}</p>
    </div>
  )
}

/*
function NameLookup (props) {
  // return <h3>{props.value}>/h3>
}
*/

/*
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      value: ''
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
       value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      //<div id='lookup-output'>{this.state.lookupOutput}</div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type='submit' value='submit' />
        </form>


        <div>
          <NameLookup value={this.state.value} />
        </div>


        // {this.state.showInfo ? <NameLookup /> : null}
      </div>


    );
  }
}
*/

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('company_name_container')
);
