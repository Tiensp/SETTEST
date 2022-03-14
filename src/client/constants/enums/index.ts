enum ButtonType {
	Numerical,
	Operation,
}

enum ButtonColor {
	Default,
	Brown,
	Orange,
}

enum InputType {
	Numerical,
	Operation
}

enum OperatorType {
	Add = 'add',
	Substract = 'substract',
	Multiply = 'multiply',
	Divide = 'divide',
	Modulo = 'modulo',
	PlusMinus = 'plusminus', 
	Equals = 'equals'
}

export { ButtonType, ButtonColor, InputType, OperatorType }
