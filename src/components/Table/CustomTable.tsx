import {flexRender, Table, Row} from "@tanstack/react-table";

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
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header =>(


                                <th key={header.id}

                                    className="py-2 px-2 text-sm font-normal hover:bg-gray-100 text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0">

                                    {
                                        header.column.getCanSort()
                                            ?
                                            <button className=" flex items-center gap-x-3 focus:outline-none w-full"
                                                    onClick={_ => header.column.toggleSorting()

                                                    }>
                                                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>

                                                {{
                                                    asc: "asc",
                                                    desc: "desc"
                                                }[header.column.getIsSorted() as string] ?? null

                                                }

                                            </button>

                                            : flexRender(header.column.columnDef.header, header.getContext())
                                    }

                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    {!isLoading &&
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-y-scroll">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} onClick={_ => handleRowClick(row)}
                                className={row.original === focusedRow ? '!bg-slate-200 even:bg-slate-50 ' : "even:bg-slate-50"}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-2 py-2 text-sm font-medium whitespace-nowrap">
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

export default CustomTable