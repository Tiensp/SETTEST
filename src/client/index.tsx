import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

function WrappedApp(): JSX.Element {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
}

ReactDOM.hydrate(<WrappedApp />, document.getElementById('root'))
