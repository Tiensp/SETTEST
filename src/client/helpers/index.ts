import { OperatorType } from '../constants/enums'
import { Operation } from '../constants/types/calculatorType'

const saveInputHistory = (
	inputsHistory: Array<Operation>,
	result: number
): string => {
	let historyData = ''
	inputsHistory.forEach((input, index, array) => {
		const lastInput = array[index - 1] ?? null
		if (
			lastInput &&
			lastInput.operator === OperatorType.Add &&
			input.operator === OperatorType.Add
		) {
			historyData = `${historyData} + ${input.value}`
			return
		}

		switch (input.operator) {
			case OperatorType.Add:
				historyData = `${historyData} ${input.value}`
				break

			case OperatorType.Substract:
				historyData = `${historyData} -`
				break

			case OperatorType.Multiply:
				historyData = `${historyData} x`
				break

			case OperatorType.Divide:
				historyData = `${historyData} ÷`
				break

			case OperatorType.Modulo:
				historyData = `${historyData} %`
				break

			case OperatorType.Equals:
				historyData = `${historyData} = ${result}`
				break

			default:
				break
		}
	})

	return historyData
}

export default saveInputHistory
