import React, { useEffect, useState } from 'react'
import { ButtonColor, InputType, OperatorType } from '../../constants/enums'
import { CalculatorInput } from '../../constants/types/calculatorType'
import CalculatorLogic from '../../modules/calculatorLogic'
import ActionBar from '../ActionBar/ActionBar'
import Button from '../Button/Button'

export default function Calculator() {
	const [inputs, setInputs] = useState<Array<CalculatorInput>>([])
	const state = CalculatorLogic.getState(inputs)
	const [clearLabel, setClearLabel] = useState('AC')

	const appendInput = (input: CalculatorInput): void => {
		setInputs(prev => [...prev, input])
	}

	const handleNumerical = (value: number) => () => {
		setInputs(prev => [...prev, { type: InputType.Numerical, value }])
	}

	const handleOperator = (operator: OperatorType) => () => {
		if (inputs.length !== 0 && operator !== OperatorType.Dot) {
			if (inputs[inputs.length - 1].type === InputType.Numerical) {
				appendInput({ type: InputType.Operation, operator })
			}
		}
	}

	const handleClearButton = () => {
		setInputs([])
	}

	const handleClick = () => {
		const content = document.getElementById(
			'display__content'
		) as HTMLInputElement
		content.select()
	}

	useEffect(() => {
		if (inputs.length > 0) {
			setClearLabel('C')
		} else {
			setClearLabel('AC')
		}
	}, [inputs])

	useEffect(() => {
		if (state.isEvaluatedValue) {
			setInputs([{ type: InputType.Numerical, value: state.displayValue }])
		}

		if (state.historyData) {
			console.log(state.historyData)
		}
	}, [state])

	return (
		<div className='calculator'>
			<div className='calculator__wrapper'>
				<ActionBar />
				<div className='grid'>
					<div className='display'>
						<input
							type='text'
							id='display__content'
							value={state.displayValue}
							onClick={handleClick}
							readOnly
						/>
					</div>
					<Button
						label={clearLabel}
						color={ButtonColor.Brown}
						onClick={handleClearButton}
					/>
					<Button
						label='+/-'
						color={ButtonColor.Brown}
						onClick={handleOperator(OperatorType.PlusMinus)}
					/>
					<Button
						label='%'
						color={ButtonColor.Brown}
						onClick={handleOperator(OperatorType.Modulo)}
					/>
					<Button
						label='÷'
						color={ButtonColor.Orange}
						onClick={handleOperator(OperatorType.Divide)}
					/>
					<Button
						label='7'
						color={ButtonColor.Default}
						onClick={handleNumerical(7)}
					/>
					<Button
						label='8'
						color={ButtonColor.Default}
						onClick={handleNumerical(8)}
					/>
					<Button
						label='9'
						color={ButtonColor.Default}
						onClick={handleNumerical(9)}
					/>
					<Button
						label='x'
						color={ButtonColor.Orange}
						onClick={handleOperator(OperatorType.Multiply)}
					/>
					<Button
						label='4'
						color={ButtonColor.Default}
						onClick={handleNumerical(4)}
					/>
					<Button
						label='5'
						color={ButtonColor.Default}
						onClick={handleNumerical(5)}
					/>
					<Button
						label='6'
						color={ButtonColor.Default}
						onClick={handleNumerical(6)}
					/>
					<Button
						label='-'
						color={ButtonColor.Orange}
						onClick={handleOperator(OperatorType.Substract)}
					/>
					<Button
						label='1'
						color={ButtonColor.Default}
						onClick={handleNumerical(1)}
					/>
					<Button
						label='2'
						color={ButtonColor.Default}
						onClick={handleNumerical(2)}
					/>
					<Button
						label='3'
						color={ButtonColor.Default}
						onClick={handleNumerical(3)}
					/>
					<Button
						label='+'
						color={ButtonColor.Orange}
						onClick={handleOperator(OperatorType.Add)}
					/>
					<Button
						label='0'
						isLarger
						color={ButtonColor.Default}
						onClick={handleNumerical(0)}
					/>
					<Button
						label=','
						color={ButtonColor.Default}
						onClick={handleOperator(OperatorType.Dot)}
					/>
					<Button
						label='='
						color={ButtonColor.Orange}
						onClick={handleOperator(OperatorType.Equals)}
					/>
				</div>
			</div>
		</div>
	)
}
