import React, {useEffect, useState} from "react";
import {useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IProgram} from "../redux/api/types";

import {
    Box, Button, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import PartTable from "../components/Table/PartTable";
import ImagePreview from "../components/ImagePreview";
import {
    DataGrid, GridApi,
    GridCallbackDetails,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    GridRowSelectionModel,
    MuiEvent, useGridApiRef
} from "@mui/x-data-grid";

const HomePage = () => {
    const {isLoading, isError, error, data: programs = []} = useGetAllProgramsQuery();
    const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null)
    const apiRef = useGridApiRef();

    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);

    useEffect(() => {
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                console.log("error");
            } else {

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const columns: GridColDef[] = [
        {
            field: 'programId',
            headerName: 'ID'
        },
        {
            field: 'name',
            minWidth: 300,
            headerName: 'Name'
        },

        {
            field: 'blank',
            minWidth: 250,
            headerName: 'Blank',
            sortComparator: (v1) => v1.height * v1.width * v1.length,
            valueFormatter: ({value}) => {
                return `${value.width} * ${value.length} * ${value.height}`
            }
        },
        {
            field: 'machiningTime',
            headerName: "Time"
        },
        {
            field: 'comment',
            flex: 2,
            headerName: "Comment"
        },

    ]
    const handleRowClick = (
        params: GridRowParams,
        event: MuiEvent<React.MouseEvent<HTMLElement>>,
        details: GridCallbackDetails
    ) => {
        let program: IProgram = params.row
        setSelectedProgram(program)
    }

    const handleRowDeleteClick = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>, params: GridRenderCellParams) => {
        e.stopPropagation(); // don't select this row after clicking
        let id = apiRef.current.getRowId(params.row)
        apiRef.current.selectRow(id, false)
    };

    const selectedColumns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Name',
            flex: 1,
            valueFormatter: ({value}) => apiRef.current.getRow(value).name
        },
        {
            field: "action",
            headerName: "Delete",
            sortable: false,
            renderCell: (params) => {
                return <Button onClick={(e) => handleRowDeleteClick(e, params)}>Click</Button>;
            }
        },
    ]


    return (
<<<<<<< Updated upstream
        <Box sx={{display: 'flex', height: '100%', flexDirection: 'column', gap: '12px', padding: '4px'}}>
            <DataGrid
                apiRef={apiRef}
                sx={{height: '80%'}}
                disableRowSelectionOnClick
                columns={columns}
                rows={programs}

                checkboxSelection
                onRowSelectionModelChange={setRowSelectionModel}
                onRowClick={handleRowClick}
            />
=======
        <div className="flex flex-col gap-2 h-full p-2">
            <CustomTable table={programsTable} onRowClick={setSelectedProgram} className="flex-1 min-h-0 h-full"/>
            <div className="h-[350px]  gap-2 flex">
>>>>>>> Stashed changes


            <Box sx={{display: 'flex', gap: '12px'}}>
                <Box sx={{
                    height: '100%',
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "8px",
                    alignItems: 'end',
                    padding: '4px'
                }}>
                    <DataGrid
                        density="compact"
                        sx={{alignSelf: "stretch", maxHeight: '300px', minHeight: '200px'}}
                        columns={selectedColumns}
                        rows={rowSelectionModel.map(item => ({id: item}))}
                        hideFooter
                    />
                    <Button variant={"contained"}>
                        Download
                    </Button>
                </Box>
                {
                    selectedProgram === null ? (
                        <Paper sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 2}}>
                            <Typography
                                variant="h6"
                                align={'center'}
                            >
                                Select Program
                            </Typography>
                        </Paper>
                    ) : (
                        <>
                            <Paper sx={{height: '100%', flex: 1}}>
                                <PartTable selectedProgram={selectedProgram}/>
                            </Paper>
                            <Paper sx={{height: '100%'}}>
                                <TableContainer
                                    sx={{maxHeight: "250px"}}

                                >
                                    <Table>
                                        <TableBody>
                                            {selectedProgram && selectedProgram.tools.map(tool => {

                                                return (

                                                    <TableRow
                                                        key={tool}>

                                                        <TableCell
                                                            component="th"
                                                            sx={{padding: "10px 8px"}}
                                                            scope="row"
                                                            id={tool}
                                                            padding="none"
                                                        >
                                                            {tool}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            <ImagePreview url={selectedProgram.files.preview.url} alt={selectedProgram.name}/>
                        </>
                    )
                }

            </Box>
        </Box>
    );
};

export default HomePage;