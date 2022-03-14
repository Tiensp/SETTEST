import { InputType, OperatorType } from '../constants/enums'

/**
 * Calculator Logic:
 * Input: --> [UserInput, UserInput, ...]
 * Generate: --> { state }
 */

export type CalculatorInput =
	| { type: InputType.Numerical; value: number }
	| { type: InputType.Operation; operator: OperatorType }

export type CalculatorState = {
	displayValue: number
}

export type Operation = {
	operator: OperatorType
	value: number
}

type OperationsBuilder = {
	operations: Operation[]
	working: Operation
}

const getOperationsBuilder = (
	inputs: Array<CalculatorInput>
): OperationsBuilder =>
	inputs.reduce<OperationsBuilder>(
		(builder, input) => {
			switch (input.type) {
				case InputType.Numerical: {
					const previousValue = builder.working?.value || 0
					const newValue = previousValue * 10 + input.value

					return { ...builder, working: { ...builder.working, value: newValue } }
				}
				case InputType.Operation: {
					if (input.operator === OperatorType.Equals) {
						return {
							operations: [
								...builder.operations,
								builder.working,
								{ operator: OperatorType.Equals, value: 0 },
							],
							working: { operator: OperatorType.Add, value: 0 },
						}
					}

					return {
						operations: [...builder.operations, builder.working],
						working: { operator: input.operator, value: 0 },
					}
				}
				default: {
					return {
						operations: [...builder.operations, builder.working],
						working: { operator: OperatorType.Add, value: 0 },
					}
				}
			}
		},
		{
			operations: [],
			working: { operator: OperatorType.Add, value: 0 },
		}
	)

const getResult = (operations: Array<Operation>): number =>
	operations.reduce<number>(
		(previousResult, currentOperation) => {
			switch (currentOperation.operator) {
				case OperatorType.Add: {
					return previousResult + currentOperation.value
				}

				case OperatorType.Substract: {
					return previousResult - currentOperation.value
				}

        case OperatorType.Multiply: {
					return previousResult * currentOperation.value
				}

        case OperatorType.Divide: {
					return previousResult / currentOperation.value
				}

        case OperatorType.Modulo: {
					return previousResult % currentOperation.value
				}

				case OperatorType.Equals: {
					return previousResult
				}

				default:
					return previousResult
			}
		},

		0 // reduce initial value
	)

const getState = (inputs: Array<CalculatorInput>): CalculatorState => {
	const builder = getOperationsBuilder(inputs)
	const { operations } = builder

	const lastOperation = operations.length
		? operations[operations.length - 1]
		: null

	if (!lastOperation) {
		return { displayValue: builder.working.value }
	}
	switch (lastOperation.operator) {
		case OperatorType.Equals: {
			return { displayValue: getResult(operations) }
		}

		default:
			return { displayValue: builder.working.value }
	}
}

const CalculatorLogic = {
	getOperationsBuilder,
	getState,
}

export default CalculatorLogic
