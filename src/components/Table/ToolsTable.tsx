import TextCell from './TextCell'

type TableProps = {
    tools?: string[],
    className?: string | undefined
}


const ToolsTable = ({tools = [], className}: TableProps) => {


    return (
        <div className={className}>
            <div
                className="overflow-auto overflow-x-hidden h-full border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-[200px] divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    <tr>
                        <th className="py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0">
                            Name
                        </th>
                    </tr>
                    </thead>
                    <tbody
                        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-y-scroll">
                    {tools.map(tool => (
                        <tr key={tool}>
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                <TextCell text={tool}/>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ToolsTable