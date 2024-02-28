import {IPart} from '../../redux/api/types'
import TextCell from './TextCell'

type TableProps = {
    parts?: IPart[],
    className?: string | undefined
}


const PartsTable = ({parts = [], className}: TableProps) => {


    return (
        <div className={className}>
            <div className="overflow-auto h-full border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    <tr>
                        <th className="py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0 whitespace-nowrap">
                            GEO Name
                        </th>
                        <th className="py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0">
                            Dimensions
                        </th>
                        <th className="py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody
                    className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-y-scroll">
                    {parts.map(part => (
                        <tr key={part.geoFilename}>
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                <TextCell text={part.geoFilename}/>

                            </td>
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                <TextCell text={`${part.dimensions.width} x ${part.dimensions.length}`}/>
                            </td>
                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">

                                <TextCell text={`${part.quantity}`}/>

                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
            </div>
        </div>

    )
}

export default PartsTable