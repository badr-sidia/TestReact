import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import PetRow from './PetRow';
import TableHeader from './TableHeader';

export default function TableComponent (props) {
  const cellStyle = {
      color:'white',
      fontSize : '18px'
  }
  const {
      handleOpenModal,
      status,
      pets,
      page,
      rowsPerPage,
      handleOpenConfirm,
      handleStatusChange,
      selectCurrentPet,
      handleChangePage,
      handleChangeRowsPerPage
    } = props
  return(
    <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
    <TableHead >
     <TableHeader 
     handleStatusChange={handleStatusChange} 
     handleOpenModal={handleOpenModal}/>
    </TableHead>
      <TableHead sx={{
        backgroundColor :'#4f7664'
    }}>
        <TableRow>
         <TableCell/>
         {/*  <TableCell ><AddCircleOutlineSharpIcon onClick={()=>handleOpenModal('Add')}/></TableCell> */}
          <TableCell sx={cellStyle}>Name</TableCell>
          <TableCell sx={cellStyle}>Category</TableCell>
          <TableCell sx={cellStyle}>Status</TableCell>
          <TableCell sx={cellStyle}>Edit</TableCell>
          <TableCell sx={cellStyle}>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{
          /* backgroundColor:'#126c3a' */
      }}>
        {pets!=undefined&&pets!=null?pets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pet) => (
          <PetRow
          key={pet.id} 
          row={pet} 
          handleOpenModal={handleOpenModal}
          handleOpenConfirm={handleOpenConfirm}
          selectCurrentPet={selectCurrentPet}
          />
        )):<div>loading</div>}
      </TableBody>
    </Table>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={pets.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        backgroundColor : '#4f7664',
        color:'white',
        fontSize : '18px'
    }}
    />
  </TableContainer>
   )

 }