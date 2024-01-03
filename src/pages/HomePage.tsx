import {useEffect, useState} from "react";
import { useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IProgram} from "../redux/api/types";
import {Box, Container} from "@mui/material";
import {DataGrid, GRID_CHECKBOX_SELECTION_FIELD, GridColDef, GridRowSelectionModel} from "@mui/x-data-grid";

const HomePage = () => {
    const { isLoading, isError, error, data: programs = [] } = useGetAllProgramsQuery();
    const [ selectedPrograms, setSelectedPrograms ] = useState<GridRowSelectionModel>([])

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
        {field: 'name', headerName: 'Name'},
        {
            field: GRID_CHECKBOX_SELECTION_FIELD,
            
        }
    ] 

    return (
        <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column'}}>
            <DataGrid
                checkboxSelection
                rows={programs}
                columns={columns}
                onRowSelectionModelChange={(newRow)=>{setSelectedPrograms(newRow)} }
                rowSelectionModel={selectedPrograms}
            />
        </Box>
        );
};

export default HomePage;