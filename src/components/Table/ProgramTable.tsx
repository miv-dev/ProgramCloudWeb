import { IProgram } from "../../redux/api/types"

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
        <></>
    )
}
export default ProgramTable