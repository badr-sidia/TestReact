import React , {useState} from 'react'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export default function  TableHeader (props) {
 const [open,setOpen] = useState(false)
 const openDropdown = () => setOpen(!open) 
 const {handleStatusChange,handleOpenModal} = props
  return(
<div class="textbox-wrapper" >
    <div style={{display:'flex',flexDirection:'row'}}>
    <FormControl style={{width:'200px'}}>
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        label="Status"
   
        sx={{borderColor:'green'}}
         onChange={handleStatusChange} 
      >
        <MenuItem value={'available'}>Available</MenuItem>
        <MenuItem value={'pending'}>Pending</MenuItem>
        <MenuItem value={'sold'}>Sold</MenuItem>
      </Select>
    </FormControl>
        <span class="input-group-btn" style={{width:'50px'}}>
           
        <AddCircleOutlineSharpIcon 
        onClick={()=>handleOpenModal('Add')}
            sx={
                {width:'50px',
                height:'60px',
                color:'green'
                }
                }/>
           
        </span>
    </div>
</div>


   )

 }