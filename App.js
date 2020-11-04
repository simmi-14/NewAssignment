
import React from 'react';
import SecondPage from "./SecondScreen";
import { createStore } from 'redux';
import appReducer from './utility/Reducer';
import { Provider } from 'react-redux'
const store = createStore(appReducer);
store.subscribe(() => console.log("Store Updated:", store.getState()));

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isloggedin: null
		};
	}

	

  
  

	render() {
	
		return (
			<Provider store={store} >
				<SecondPage />
			</Provider>
		);
	};
};

export default App;