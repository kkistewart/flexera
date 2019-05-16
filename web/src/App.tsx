import 'es6-shim';
import * as React from 'react';

import People from './people/People';

class App extends React.Component<any, any> {
    render() {
      return (
        <People />
      );
    }
}

export default App;
