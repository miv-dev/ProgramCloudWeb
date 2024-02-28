type TextCellProps = {
    text: string
}
const TextCell = ({text}: TextCellProps) => {
    return <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{text}</p>
}

export default TextCell