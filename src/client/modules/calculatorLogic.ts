import { InputType, OperatorType } from '../constants/enums'

export type CalculatorInput =
	| { type: InputType.Numerical; value: number }
	| { type: InputType.Operation; operator: OperatorType }

export type CalculatorState = {
	displayValue: number
	isEvaluatedValue: boolean
}

export type Operation = {
	operator: OperatorType
	value: number
}

export type OperationsBuilder = {
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

					return {
						...builder,
						working: { operator: OperatorType.Add, value: newValue },
					}
				}
				case InputType.Operation: {
					// switch case every operator
					switch (input.operator) {
						case OperatorType.Substract: {
							return {
								operations: [
									...builder.operations,
									builder.working,
									{ operator: OperatorType.Substract, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

						case OperatorType.Multiply: {
							return {
								operations: [
									...builder.operations,
									builder.working,
									{ operator: OperatorType.Multiply, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

						case OperatorType.Divide: {
							return {
								operations: [
									...builder.operations,
									builder.working,
									{ operator: OperatorType.Divide, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

						case OperatorType.Modulo: {
							return {
								operations: [
									...builder.operations,
									builder.working,
									{ operator: OperatorType.Modulo, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

            case OperatorType.PlusMinus: {
							return {
								operations: [
									...builder.operations,
                  { ...builder.working, value: builder.working.value * -1 },
                  { operator: OperatorType.PlusMinus, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

						case OperatorType.Equals: {
							return {
								operations: [
									...builder.operations,
									builder.working,
									{ operator: OperatorType.Equals, value: 0 },
								],
								working: { operator: OperatorType.Add, value: 0 },
							}
						}

						default: {
							return {
								operations: [...builder.operations, builder.working],
								working: { operator: input.operator, value: 0 },
							}
						}
					}
				}
				default: {
					return {
						operations: [...builder.operations, builder.working],
						working: { operator: OperatorType.Add, value: 0 },
					}
				}
			}
		}, // reduce initial value
		{
			operations: [],
			working: { operator: OperatorType.Add, value: 0 },
		}
	)

const getPrecedeOperatorResult = (
	operations: Array<Operation>
): Array<Operation> => {
	operations.forEach((currentValue, index, array) => {
		switch (currentValue.operator) {
			case OperatorType.Multiply: {
				const total = {
					operator: OperatorType.Add,
					value: array[index - 1].value * array[index + 1].value,
				}
				array.splice(
					index - 1,
					3,
					{ operator: OperatorType.Add, value: 0 },
					{ operator: OperatorType.Add, value: 0 },
					total
				)
				break
			}

			case OperatorType.Divide: {
				const total = {
					operator: OperatorType.Add,
					value: array[index - 1].value / array[index + 1].value,
				}
				array.splice(
					index - 1,
					3,
					{ operator: OperatorType.Add, value: 0 },
					{ operator: OperatorType.Add, value: 0 },
					total
				)
				break
			}

			case OperatorType.Modulo: {
				const total = {
					operator: OperatorType.Add,
					value: array[index - 1].value % array[index + 1].value,
				}
				array.splice(
					index - 1,
					3,
					{ operator: OperatorType.Add, value: 0 },
					{ operator: OperatorType.Add, value: 0 },
					total
				)
				break
			}

			case OperatorType.Substract: {
				const total = {
					operator: OperatorType.Add,
					value: array[index + 1].value * -1,
				}
				array.splice(index + 1, 1, total)
				break
			}

			default:
				break
		}
	})

	return operations
}

const getResult = (operations: Array<Operation>): number => {
	const precedeOperatorResult = getPrecedeOperatorResult(operations)

	return precedeOperatorResult.reduce<number>(
		(previousResult, currentOperation) => {
			switch (currentOperation.operator) {
				case OperatorType.Add: {
					return previousResult + currentOperation.value
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
}

const getState = (inputs: Array<CalculatorInput>): CalculatorState => {
	const builder = getOperationsBuilder(inputs)
	const { operations } = builder
	const inputsHistory = [...operations]
	const lastOperation = inputsHistory.length
		? inputsHistory[inputsHistory.length - 1]
		: null

	if (!lastOperation) {
		return { displayValue: builder.working.value, isEvaluatedValue: false }
	}

	switch (lastOperation.operator) {
		case OperatorType.Equals: {
			const result = getResult(operations)
			return { displayValue: result, isEvaluatedValue: true }
		}

		default: {
      console.log(builder)
			const isAddOperator =
				builder.operations[builder.operations.length - 1].operator === OperatorType.Add
					? 1
					: 2
			const displayValue =
				inputs[inputs.length - 1].type !== InputType.Numerical
					? builder.operations[builder.operations.length - isAddOperator].value
					: builder.working.value
			return { displayValue, isEvaluatedValue: false }
		}
	}
}

const CalculatorLogic = {
	getOperationsBuilder,
	getState,
}

export default CalculatorLogic
