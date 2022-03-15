import React from 'react'
import { ButtonColor } from '../../constants/enums'

/**
 * @label The label of button.
 * @isLarger True if button is larger than normal.
 * @direction False by default. If isLarger is true, True: Horizontal, False: Vertical.
 */
type Props = {
	label: string
	color: ButtonColor
	isLarger?: boolean
	onClick: React.MouseEventHandler
}

export default function Button({ label, color, isLarger, onClick }: Props) {
	const largerButton = isLarger ? ' button--large' : ''

	let buttonColor
	if (color === ButtonColor.Orange) {
		buttonColor = ' button--orange'
	} else if (color === ButtonColor.Brown) {
		buttonColor = ' button--brown'
	} else {
		buttonColor = ''
	}

	return (
		<button
			type='button'
			className={`button${largerButton}${buttonColor}`}
			onClick={onClick}
		>
			{label}
		</button>
	)
}

Button.defaultProps = {
	isLarger: false,
}
