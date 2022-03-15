import { InputType, OperatorType } from '../enums'

export type CalculatorInput =
	| { type: InputType.Numerical; value: number }
	| { type: InputType.Operation; operator: OperatorType }

export type CalculatorState = {
	displayValue: number
	isEvaluatedValue: boolean
	historyData?: string
}

export type Operation = {
	operator: OperatorType
	value: number
}

export type OperationsBuilder = {
	operations: Operation[]
	working: Operation
}
