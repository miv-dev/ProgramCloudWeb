import React, {useEffect, useState} from "react";
import { useGetAllProgramsQuery} from "../redux/api/programsApi";
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
const HomePage = () => {
    const { isLoading, isError, error, data: programs = [] } = useGetAllProgramsQuery();
    const [ selectedPrograms, setSelectedPrograms ] = useState<IProgram[]>([])
    const [ selectedProgram, setSelectedProgram ] = useState<IProgram | null>(null)

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


    const handleClick = ( program: IProgram) => {
        if (selectedPrograms.find(value => program === value) === undefined){
            setSelectedPrograms([program, ...selectedPrograms])
        }else{
            let newList = selectedPrograms.filter(value => value.id !== program.id)
            setSelectedPrograms(newList)
        }
    };


    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <nav className="px-6 py-4 flex justify-between items-center">
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                    PROGRAM CLOUD
                </Typography>
                <div className={"flex gap-4"}>
                    <ProfilePopover/>
                    <IconButton>
                        <NotificationsNoneIcon/>
                    </IconButton>
                    <IconButton>
                        <HistoryIcon/>
                    </IconButton>

                </div>
            </nav>
            <Box sx={{padding: '10px', display: 'flex', flexDirection: 'column', height: '100%'}}>

                <Box sx={{flex: 1}}>
                    <ProgramTable
                        selectedProgram={selectedProgram}
                        programs={programs}
                        selectedPrograms={selectedPrograms}
                        selectProgram={setSelectedProgram}
                        toggleProgram={handleClick}/>
                </Box>

                <Box sx={{height: '250px', display: 'flex', gap: '12px'}}>
                    <Paper sx={{height: '100%', flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', padding: '4px'}}>
                        <TableContainer

                                >
                                <Table>

                                    <TableBody>
                                        {selectedPrograms.map(value=>{

                                            return(
                                                <TableRow
                                                    selected={value === selectedProgram}
                                                    onClick={() => setSelectedProgram(value)}
                                                    >

                                                    <TableCell
                                                        component="th"
                                                        sx={{padding:"10px 8px"}}
                                                        id={value.id}
                                                        scope="row"
                                                        padding="none"
                                                        >
                                                        {value.name}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        sx={{padding:"10px 8px"}}
                                                        id={value.id}
                                                        scope="row"
                                                        align={"right"}
                                                        >
                                                        <IconButton size={"small"} onClick={() => handleClick((value))}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        <Button variant={"contained"} >
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
                        ) :(
                            <>
                                <Paper sx={{height: '100%', flex: 1}}>
                                    <PartTable selectedProgram={selectedProgram}/>
                                </Paper>
                                <Paper sx={{height: '100%'}}>
                                    <TableContainer
                                        sx={{ maxHeight: "250px"}}

                                        >
                                        <Table>
                                            <TableBody>
                                                {selectedProgram && selectedProgram.tools.map(tool=>{

                                                    return(

                                                        <TableRow
                                                            key={tool}>

                                                            <TableCell
                                                                component="th"
                                                                sx={{padding:"10px 8px"}}
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
        </Box>
        );
};

export default HomePage;