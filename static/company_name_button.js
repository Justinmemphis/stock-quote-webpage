// started based off of this website: https://reactjs.org/docs/add-react-to-a-website.html
// also from here: https://reactjs.org/docs/forms.html

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      lookupOutput: []
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
    this.setState({
      lookupOutput: [event.target.value]
    });
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='submit' />
      </form>
      //<div id='lookup-output'>{this.state.lookupOutput}</div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('company_name_container'));
