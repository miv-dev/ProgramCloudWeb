import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {flexRender, Table, Row, Header} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type TableProps<T> = {
    table: Table<T>,
    onRowClick?: (value: T) => void,
    className?: string | undefined,
    focusedRow?: T | null
    isLoading?: boolean
}


const CustomTable = <T, >({table, onRowClick, className, isLoading = false, focusedRow}: TableProps<T>) => {


    const handleRowClick = (row: Row<T>) => {
        if (onRowClick) {
            onRowClick(row.original)
        }
    }

    return (
        <div className={className}>
            <div className="overflow-auto h-full border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table

                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"

                >
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => <TableHeader header={header}/>)}
                        </tr>
                    ))}
                    </thead>
                    {!isLoading &&
                        <tbody
                            className="bg-white divide-y overflow-y-auto  divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                        {table.getRowModel().rows.map(row => <TableRow row={row} onRowClick={() => handleRowClick(row)}
                                                                       isFocused={focusedRow === row.original}/>)}
                        </tbody>
                    }

                </table>
                {isLoading && <div className="grid place-items-center h-full">
                    <svg fill='none' className="w-10 h-10 animate-spin" viewBox="0 0 32 32"
                         xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                              d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                              fill='currentColor' fillRule='evenodd'/>
                    </svg>
                </div>

                }
            </div>
        </div>

    )
}

export default CustomTable