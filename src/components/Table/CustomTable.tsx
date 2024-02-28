import {flexRender, Table, Row} from "@tanstack/react-table";

type TableProps<T> = {
    table: Table<T>,
    onRowClick?: (value: T) => void,
    className?: string | undefined
}


const CustomTable = <T, >({table, onRowClick, className}: TableProps<T>) => {


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
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                    className="py-2 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky top-0">

                                    {
                                        header.column.getCanSort()
                                            ?
                                            <button className="flex items-center gap-x-3 focus:outline-none w-full"
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
                    <tbody
                        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 overflow-y-scroll">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} onClick={_ => handleRowClick(row)} className={row.index % 2 === 1 ? 'bg-slate-50' : ""}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default CustomTable