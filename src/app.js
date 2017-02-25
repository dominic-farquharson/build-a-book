import './app.scss'
import Test from './Test';

import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Test.js <Test />
        <a href="http://google.com">Test</a>
     </div>
    )
  }
}



export default App;
