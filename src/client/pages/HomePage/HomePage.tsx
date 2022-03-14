import React from 'react'
import Calculator from '../../components/Calculator/Calculator'
import './style.scss'

/**
 * The home page. Nothing fancy here.
 *
 * @returns react component.
 */
export default function HomePage() {
	return (
		<div className='home__container'>
			<Calculator />
		</div>
	)
}
