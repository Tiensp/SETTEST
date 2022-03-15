import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SERVER_URL from './constants'
import HomePage from './pages/HomePage/HomePage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import { ServerDataProvider } from './serverData'
import './style.scss'
import routes from './routes'

interface Props {
	/** Data used in the react prerender process. Use only in the server side. */
	serverData?: unknown // Use unknown type because serverData can recieved any type of data from server.
}

/** The root react component for both client side rendering and server side rendering */
/* Use (<a></a>) to always be rendered by the server. Use Link tag, otherwise */
export default function App(props: Props) {
	const { serverData } = props

	return (
		<ServerDataProvider value={props ? serverData : null}>
			<div className='sidebar'>
				<a href={`${SERVER_URL}/`}>Home</a>
				<a href={`${SERVER_URL}/history`}>History</a>
			</div>

			<div className='content'>
				<Routes>
					<Route path={routes.home.value} element={<HomePage />} />
					<Route path={routes.history.value} element={<HistoryPage />} />
				</Routes>
			</div>
		</ServerDataProvider>
	)
}

App.defaultProps = {
	serverData: null,
}
