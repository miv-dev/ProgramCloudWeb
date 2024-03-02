import {flexRender, Row} from "@tanstack/react-table"

type RowProps<T> = {
    row: Row<T>,
    onRowClick: () => void,
    isFocused: boolean
}


const TableRow = <T, >({row, onRowClick, isFocused}: RowProps<T>) => {

    const style = "transition-all even:bg-slate-50 hover:bg-slate-200 cursor-pointer"


    return (
        <tr key={row.id} onClick={_ => onRowClick()}
            className={`${style} ${isFocused && "!bg-slate-300"}`}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id}

                    className={`px-2 py-2 text-sm font-medium whitespace-nowrap ${cell.column.getIsSorted() !== false && "bg-slate-500/10"}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    )

}
export default TableRow