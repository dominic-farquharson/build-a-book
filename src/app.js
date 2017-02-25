// importing sass file
import './app.scss'

// importing Book.js
import Book from './components/Book';
// importing chapter component
import Chapter from './components/Chapter';
// importing resource component
import Resource from './components/Resource';

// importing react and component
import React, {Component} from 'react';

// creating app component
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>App.js
        <Book />
        <Chapter />
        <Resource />
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
