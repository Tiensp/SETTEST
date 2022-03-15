/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from '@jest/globals'
import { InputType, OperatorType } from '../../src/client/constants/enums'
import {
	CalculatorInput,
	Operation,
} from '../../src/client/constants/types/calculatorType'
import CalculatorLogic from '../../src/client/modules/calculatorLogic'

describe('Calculator', () => {
	test('generates operations', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Add },
			{ type: InputType.Numerical, value: 3 },
			{ type: InputType.Operation, operator: OperatorType.Equals },
		]

		const operations: Array<Operation> = [
			{ operator: OperatorType.Add, value: 12 },
			{ operator: OperatorType.Add, value: 3 },
			{ operator: OperatorType.Equals, value: 0 },
		]

		expect(CalculatorLogic.getOperationsBuilder(inputs).operations).toEqual(
			operations
		)
	})

	test('has displayValue of 0 with no inputs', () => {
		const inputs: Array<CalculatorInput> = []

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(0)
	})

	test('derives displayValue upon first numerical input', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
		]

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(1)
	})

	test('no change displayValue if press Equals without operator', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
		]

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(1)
	})

	test('derives displayValue upon operator input', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Add },
		]
		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(12)
	})

	test('derives displayValue upon new numerical input', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Add },
			{ type: InputType.Numerical, value: 3 },
		]

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(3)
	})

	test('derive final state', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Add },
			{ type: InputType.Numerical, value: 3 },
			{ type: InputType.Operation, operator: OperatorType.Equals },
		]

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(15)
	})

	test('derive final state with complex operation', () => {
		const inputs: Array<CalculatorInput> = [
			{ type: InputType.Numerical, value: 1 },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Add },
			{ type: InputType.Numerical, value: 3 },
			{ type: InputType.Operation, operator: OperatorType.Substract },
			{ type: InputType.Numerical, value: 5 },
			{ type: InputType.Operation, operator: OperatorType.Multiply },
			{ type: InputType.Numerical, value: 2 },
			{ type: InputType.Operation, operator: OperatorType.Divide },
			{ type: InputType.Numerical, value: 5 },
			{ type: InputType.Operation, operator: OperatorType.Equals },
		]

		const state = CalculatorLogic.getState(inputs)
		expect(state.displayValue).toEqual(13)
	})
})
