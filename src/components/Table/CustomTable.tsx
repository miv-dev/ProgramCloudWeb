import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {flexRender, Table, Row, Header} from "@tanstack/react-table";

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
                            className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} onClick={_ => handleRowClick(row)}
                                className={row.original === focusedRow ? '!bg-slate-200 even:bg-slate-50 ' : "even:bg-slate-50"}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}

                                        className={`px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap ${cell.column.getIsSorted() !== false && "bg-slate-500/10"}`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
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
type HeaderProps<T> = {
    header: Header<T, unknown>
}


const TableHeader = <T, >({header}: HeaderProps<T>) => {

    const canSort = header.column.getCanSort()

    const style = "py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0"

    if (!header.column.getIsSorted()) {
        const btnStyle = "flex items-center gap-x-3 focus:outline-none w-full justify-between"
    } else {
        const btnStyle = "flex items-center gap-x-3 focus:outline-none w-full justify-between "

    }

    return (
        <th key={header.id}

            className={`${style} ${canSort && "hover:bg-gray-100"} ${header.column.getIsSorted() !== false && "bg-slate-400 text-white hover:bg-slate-500"}`}>

            {
                canSort
                    ?
                    <button className=" flex items-center gap-x-3 focus:outline-none w-full justify-between"
                            onClick={_ => header.column.toggleSorting()

                            }>
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>

                        {{
                            asc: <ChevronDownIcon className="h-4 w-4"/>,
                            desc: <ChevronUpIcon className="h-4 w-4"/>
                        }[header.column.getIsSorted() as string] ?? null

                        }

                    </button>

                    : flexRender(header.column.columnDef.header, header.getContext())
            }

        </th>
    )

}

export default CustomTable