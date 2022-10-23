import { SetStateAction } from "react"

interface SelectTagProps {
	useTagValue: (value: SetStateAction<tag>) => void
	defaultValue: tag
}

function SelectTag (props: SelectTagProps) {
	return (
		<select defaultValue={ props.defaultValue } onChange={ (e) => props.useTagValue(e.target.value as tag) }>
			<option value="h1">Header h1</option>
			<option value="h2">Header h2</option>
			<option value="h3">Header h3</option>
			<option value="h4">Header h4</option>
			<option value="h5">Header h5</option>
			<option value="h6">Header h6</option>
			<option value="p">Paragraph p</option>
		</select>
	)
}

export default SelectTag