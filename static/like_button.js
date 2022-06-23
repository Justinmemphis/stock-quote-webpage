// started based off of this website: https://reactjs.org/docs/add-react-to-a-website.html

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      companyNameInput: []
     };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      //<div id='output-display'>{this.state.companyNameInput}</div>
      <button onClick={ () => this.setState( { liked: true })}>
        Like
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('like_button_container'));
