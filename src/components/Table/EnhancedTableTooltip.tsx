import {alpha, IconButton, Box, Typography, Tooltip, TextField, InputAdornment} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search'

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Box
            sx={{
                padding: '12px 12px'
            }}
            >
           <TextField id="outlined-basic" label="Search" variant="outlined"
               InputProps={{
               startAdornment: (
                   <InputAdornment position="start">
                       <SearchIcon />
                   </InputAdornment>
                   ),
               }}
           />
        </Box>
        );
}
export default  EnhancedTableToolbar