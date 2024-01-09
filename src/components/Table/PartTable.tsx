import {IProgram} from "../../redux/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
interface PartTableProps {
  selectedProgram: IProgram
}

const PartTable = ({selectedProgram}: PartTableProps) => {
  return(
    <TableContainer
      sx={{ maxHeight: "250px", minWidth: '450px'}}
      >
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>GEO Name</TableCell>
            <TableCell align='right'>Dimensions, mm</TableCell>
            <TableCell align='right'>Quantity</TableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {selectedProgram.parts.map(part=>{

            return(
              <TableRow
                key={part.geoFilename}>

                <TableCell
                  component="th"
                  scope="row"
                  id={part.geoFilename}
                  >
                  {part.geoFilename}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  id={part.geoFilename}
                  align='right'

                  >
                  {`${part.dimensions.length} x ${part.dimensions.width}`}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align='right'
                  id={part.geoFilename}
                  >
                  {part.quantity}
                </TableCell>
              </TableRow>
              )
          })}

        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default PartTable