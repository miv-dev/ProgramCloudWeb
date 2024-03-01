import {createColumnHelper, getCoreRowModel, useReactTable, getSortedRowModel} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";
import ImagePreview from "../components/ImagePreview";
import CustomTable from "../components/Table/CustomTable";
import IndeterminateCheckbox from "../components/Table/IndeterminateCheckbox";
import PartsTable from "../components/Table/PartsTable";
import TextCell from "../components/Table/TextCell";
import ToolsTable from "../components/Table/ToolsTable";
import {useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IProgram} from "../redux/api/types";
import {ArrowUpTrayIcon} from "@heroicons/react/24/solid";
import {ArrowDownTrayIcon, CursorArrowRaysIcon} from "@heroicons/react/24/outline";
import Header from "../components/Header";


const columnHelper = createColumnHelper<IProgram>()
const columns = [
    columnHelper.display({
        id: 'select',
        header: ({table}) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({row}) => (
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
        size: 44
    }),
    columnHelper.accessor("programId", {
        cell: info => <TextCell text={info.getValue()}/>,
        header: "ID"
    }),
    columnHelper.accessor("name", {
            cell: info => <TextCell text={info.getValue()}/>,
            header: "Name",
            enableSorting: true,
        }
    ),
    columnHelper.accessor("blank", {
            cell: info => {
                const blank = info.getValue()
                return (
                    <TextCell text={`${blank.width} x ${blank.length} x ${blank.height}`}/>
                )
            },
            header: "Blank",
            enableSorting: true,

        }
    ),

    columnHelper.accessor("machiningTime", {
            cell: info => <TextCell text={info.getValue().toString()}/>,
            header: "Time",
            enableSorting: true,
        }
    ),
    columnHelper.accessor("comment", {
            cell: info => <TextCell text={info.getValue()}/>,
            header: "Comment",
            enableSorting: true,
        }
    ),
]

const HomePage = () => {
    const {isLoading, isError, error, data: programs = []} = useGetAllProgramsQuery();
    const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null)
    const [selectedPrograms, setSelectedPrograms] = useState<IProgram[]>([])
    const [rowSelection, setRowSelection] = React.useState({})


    useEffect(() => {
        const newIds = Object.keys(rowSelection)

        let newList = selectedPrograms.filter(value => newIds.includes(value.id))

        newIds.forEach(id => {
            const program = newList.find(value => value.id === id)

            if (program === undefined) {
                const program = programs.find(value => value.id === id)
                program && newList.push(program)
            }
        })
        setSelectedPrograms(newList)

    }, [rowSelection])


    const selectedColumns = [
        columnHelper.accessor("name", {
                cell: info => <TextCell text={info.getValue()}/>,
                header: "Name",
                enableSorting: false,
            }
        ),
        columnHelper.display({
            id: "action",
            header: () => {
                return (
                    <div className="flex justify-end">
                        <button className="middle none center flex items-center justify-center rounded-md p-1 font-sans text-xs font-bold uppercase text-white bg-slate-400 transition-all hover:bg-slate-500 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                            <ArrowDownTrayIcon className="h-5 w-5"/>

                        </button>
                    </div>
                )
            },
            size: 44,
        })
    ]


    const programsTable = useReactTable({
        data: programs,
        columns: columns,
        state: {
            rowSelection
        },
        getRowId: originalRow => originalRow.id,
        enableSorting: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    const selectedProgramsTable = useReactTable({
        data: selectedPrograms,
        columns: selectedColumns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div className="flex flex-col gap-2 h-full p-2">
            <Header/>
            <CustomTable table={programsTable} isLoading={isLoading} focusedRow={selectedProgram}
                         onRowClick={setSelectedProgram}
                         className="flex-1 min-h-0 h-full"/>

            <div className="h-[350px]  gap-2 flex">

                <CustomTable table={selectedProgramsTable} onRowClick={setSelectedProgram} focusedRow={selectedProgram}
                             className="w-full max-w-[700px]"/>
                {selectedProgram ?
                    <>
                        <PartsTable parts={selectedProgram?.parts} className="w-fit"/>
                        <ToolsTable tools={selectedProgram?.tools} className="w-fit"/>
                        <ImagePreview url={selectedProgram?.files.preview.url ?? ''}
                                      alt={selectedProgram?.name ?? "Program Name"}/>
                    </>

                    :
                    <div className="place-items-center grid w-full">
                        <div className="flex gap-2 text-gray-400 items-center">
                            <CursorArrowRaysIcon  className="h-10 w-10 "/>
                            <p className="font-bold">Select program</p>
                        </div>
                    </div>

                }

            </div>
        </div>
    )
        ;
};

export default HomePage;