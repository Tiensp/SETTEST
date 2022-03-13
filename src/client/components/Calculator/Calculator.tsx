import React from 'react'
import { ButtonColor } from '../../constants/enums'
import ActionBar from '../ActionBar/ActionBar'
import Button from '../Button/Button'
import Display from '../Display/DIsplay'

export default function Calculator() {
	return (
		<div className='calculator'>
			<div className='calculator__wrapper'>
				<ActionBar />
				<div className='grid'>
					<Display />
					<Button label='AC' color={ButtonColor.Brown} />
					<Button label='+/-' color={ButtonColor.Brown} />
					<Button label='%' color={ButtonColor.Brown} />
					<Button label='÷' color={ButtonColor.Orange} />
					<Button label='7' color={ButtonColor.Default} />
					<Button label='8' color={ButtonColor.Default} />
					<Button label='9' color={ButtonColor.Default} />
					<Button label='x' color={ButtonColor.Orange} />
					<Button label='4' color={ButtonColor.Default} />
					<Button label='5' color={ButtonColor.Default} />
					<Button label='6' color={ButtonColor.Default} />
					<Button label='-' color={ButtonColor.Orange} />
					<Button label='1' color={ButtonColor.Default} />
					<Button label='2' color={ButtonColor.Default} />
					<Button label='3' color={ButtonColor.Default} />
					<Button label='+' color={ButtonColor.Orange} />
					<Button label='0' isLarger color={ButtonColor.Default} />
					<Button label=',' color={ButtonColor.Default} />
					<Button label='=' color={ButtonColor.Orange} />
				</div>
			</div>
		</div>
	)
}
