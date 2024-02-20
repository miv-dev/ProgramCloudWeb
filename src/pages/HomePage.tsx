import React, {useEffect, useState} from "react";
import {useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IProgram} from "../redux/api/types";

import {
    Box, Button,
    IconButton, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ProgramTable from "../components/Table/ProgramTable";
import ProfilePopover from "../components/ProfilePopover";
import CloseIcon from '@mui/icons-material/Close';
import PartTable from "../components/Table/PartTable";
import ImagePreview from "../components/ImagePreview";
import HistoryIcon from '@mui/icons-material/History';
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridRowParams,
    GridRowSelectionModel,
    MuiEvent, useGridApiRef
} from "@mui/x-data-grid";

const HomePage = () => {
    const {isLoading, isError, error, data: programs = []} = useGetAllProgramsQuery();
    const [selectedPrograms, setSelectedPrograms] = useState<IProgram[]>([])
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


    const handleClick = (program: IProgram) => {
        if (selectedPrograms.find(value => program === value) === undefined) {
            setSelectedPrograms([program, ...selectedPrograms])
        } else {
            let newList = selectedPrograms.filter(value => value.id !== program.id)
            setSelectedPrograms(newList)
        }
    };
    const columns: GridColDef[] = [
        {field: 'id'},
        {field: 'programId'},
        {field: 'name'},

    ]
    const handleRowClick = (
        params: GridRowParams,
        event: MuiEvent<React.MouseEvent<HTMLElement>>,
        details: GridCallbackDetails
    ) => {
        let program: IProgram = params.row

        setSelectedProgram(program)
    }

    const selectedColumns: GridColDef[] = [
        {
            field: 'id',
            valueFormatter: ({value}) => apiRef.current.getRow(value).name
        }
    ]


    return (
        <Box sx={{display: 'flex', height: '100%', flexDirection: 'column'}}>
            <DataGrid
                apiRef={apiRef}
                sx={{height: '100%'}}
                disableRowSelectionOnClick
                columns={columns}
                rows={programs}
                checkboxSelection
                onRowSelectionModelChange={setRowSelectionModel}
                onRowClick={handleRowClick}
            />


            <Box sx={{flex: 1, display: 'flex', gap: '12px'}}>
                <Paper sx={{
                    height: '100%',
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    padding: '4px'
                }}>
                    <DataGrid
                        columns={selectedColumns}
                        rows={rowSelectionModel.map(item => ({id: item}))}
                    />
    <Button variant={"contained"}>
        Download
    </Button>
</Paper>
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
)
    ;
};

export default HomePage;