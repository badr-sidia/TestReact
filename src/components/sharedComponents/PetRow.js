
import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ListImage from '../sharedComponents/pets/ListImage';

export default function PetRow(props) {
  const cellStyle = {
    fontSize : '15px'
}
  const { row ,handleOpenModal ,handleOpenConfirm, selectCurrentPet} = props;
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const handleEditClicked =()=>{
    handleOpenModal('Edit')
    selectCurrentPet(row)
  }

  const handleDeleteClicked = ()=>{
    handleOpenConfirm()
    selectCurrentPet(row)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={cellStyle} component="th" scope="row">
          {row.name}
        </TableCell>
      <TableCell sx={cellStyle}>{row.category!=undefined?row.category.name:"#"}</TableCell>  
        <TableCell sx={cellStyle}>{row.status}</TableCell>
        <TableCell ><ViewQuiltIcon onClick={()=>handleEditClicked()}/></TableCell>
        <TableCell ><DeleteIcon onClick={()=>handleDeleteClicked()}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tags
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Photos</TableCell>
                    <TableCell align="right">Tags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                  <TableCell component="th" scope="row">
                    <ListImage photos={row.photoUrls}/>
                  </TableCell>
                  <TableCell component="th" scope="row">
                  <List dense={dense}>
              
                {row.tags!=undefined&&row.tags.map((tag)=><ListItem key={tag.id}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={tag.name}
                    secondary={secondary ? 'Secondary text' : null}
                    sx={cellStyle}
                  />
                </ListItem>)
               }
            </List>
                  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> 
    </React.Fragment>
  );
}
