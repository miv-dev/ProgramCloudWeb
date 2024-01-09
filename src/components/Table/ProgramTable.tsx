import {Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Checkbox} from "@mui/material"
import { IProgram } from "../../redux/api/types"
import EnhancedTableToolbar from "./EnhancedTableTooltip"

interface ProgramTableProps {
    selectedProgram: IProgram| null
    programs: IProgram[]
    selectedPrograms: IProgram[]
    selectProgram: (program: IProgram) => void
    toggleProgram: (program: IProgram) => void
}

const ProgramTable = (
    {selectedProgram, programs, selectProgram, toggleProgram,selectedPrograms}: ProgramTableProps
) => {
    
    
    return (
        <Paper>
            <EnhancedTableToolbar numSelected={programs.length} />
            <TableContainer
    
                >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Blank, mm</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {programs.map(program=>{
                            return(
                                <TableRow
                                    selected={program === selectedProgram}
                                    key={program.id}
                                    onClick={() =>selectProgram(program)}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            size="medium"
                                            color="primary"
                                            checked={selectedPrograms.includes(program)}
                                            onClick={() => toggleProgram(program)}
                                            inputProps={{
                                            'aria-labelledby': program.id,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={program.programId}
                                        scope="row"
                                        >
                                        {program.programId}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={program.id}
                                        scope="row"
                                        >
                                        {program.name}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={program.id}
                                        scope="row"
                                        >
                                    {`${program.blank.width} x ${program.blank.length} x ${program.blank.height}`}
                                    </TableCell>
                                    
                                </TableRow>
                                )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default ProgramTable