// started based off of this website: https://reactjs.org/docs/add-react-to-a-website.html
// also from here: https://reactjs.org/docs/forms.html
// also: https://stackoverflow.com/questions/58579975/how-to-invoke-a-component-on-handlesubmit-in-react

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      lookupOutput: [],
      showInfo: false
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
       value: event.target.value,
       lookupOutput: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value + ' ' + this.state.lookupOutput);
    event.preventDefault();
    this.setState({ showInfo: true })
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
            <input type='submit' value='submit' onClick={this.handleSubmit} />
        </form>
        {this.state.showInfo ? <Info /> : null}
      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('company_name_container'));
