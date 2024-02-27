import {createColumnHelper, getCoreRowModel, useReactTable, getSortedRowModel} from "@tanstack/react-table";
import React, {useState} from "react";
import ImagePreview from "../components/ImagePreview";
import CustomTable from "../components/Table/CustomTable";
import PartsTable from "../components/Table/PartsTable";
import TextCell from "../components/Table/TextCell";
import ToolsTable from "../components/Table/ToolsTable";
import {useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IPart, IProgram} from "../redux/api/types";


const columnHelper = createColumnHelper<IProgram>()
const columns = [
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
const selectedColumns = [
    columnHelper.accessor("name", {
            cell: info => <TextCell text={info.getValue()}/>,
            header: "Name",
            enableSorting: true,
        }
    ),
]
const HomePage = () => {
    const {isLoading, isError, error, data: programs = []} = useGetAllProgramsQuery();
    const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null)
    const [selectedPrograms, setSelectedPrograms] = useState<IProgram[]>([])


    const programsTable = useReactTable({
        data: programs,
        columns: columns,
        enableSorting: true,
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
            <div className="flex-1 min-h-0  h-full">
                <CustomTable table={programsTable} onRowClick={setSelectedProgram}/>
            </div>
            <div className="h-[350px]  gap-2 flex">
                <div className="w-full">
                    <CustomTable table={selectedProgramsTable}/>
                </div>
                <div className="w-fit">
                    <PartsTable parts={selectedProgram?.parts ?? []}/>
                </div>
                <div className="w-fit"><ToolsTable tools={selectedProgram?.tools ?? []}/></div>
                <ImagePreview url={selectedProgram?.files.preview.url ?? ''}
                              alt={selectedProgram?.name ?? "Program Name"}/>
            </div>
        </div>
    );
};

export default HomePage;