import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/home';
import Model from './pages/model';
import Header from './components/header';
import './App.scss';

// AnimatePresence allows components to animate out when
// they're removed from the React tree. It's required
// to enable exit animations because React lacks lifecycle
// methods that notifies components when they're going to
// be unmounted and allows them to defer that unmounting
// until after an operation is complete (in this case an
// animation).
//
// initial prop only animates if we come from a direct link.
// exitBeforeEnter prop allows only one component to be rendered at
// the same time.

function App() {
	const imageDetails = {
		width: 524,
		height: 650,
	};

	return (
		<Router>
			<Header />

			<Route
				render={({ location }) => (
					<AnimatePresence initial={false} exitBeforeEnter>
						<Switch location={location} key={location.pathname}>
							<Route
								exact
								path="/"
								render={() => <Home imageDetails={imageDetails} />}
							/>
							<Route
								exact
								path="/model/:id"
								render={() => <Model imageDetails={imageDetails} />}
							/>
						</Switch>
					</AnimatePresence>
				)}
			/>
		</Router>
	);
}

export default App;
