import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { flexRender, Header } from "@tanstack/react-table"

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

export default TableHeader