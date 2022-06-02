import * as React from 'react';
import { memo } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import apiService from '../../../api/pets';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const petTags = [
  'tag 1',
  'tag 2',
  'tag 3',
  'tag 4',
  'tag 5'
];

 function PetsModal(props) {
  const { open,modalType,selectedPet,onClose ,refreshPetList , handleEditPet} = props
  const [pet,setPet]=React.useState(modalType=='Add'?
  {
  category: {
    id: 0,
    name: ""
  },
  name: "",
  photoUrls: [
     'https://i.pinimg.com/originals/5c/2c/44/5c2c44f16da1caf134c00bc4f9c72ea0.jpg',
     'https://i.pinimg.com/originals/5c/2c/44/5c2c44f16da1caf134c00bc4f9c72ea0.jpg'
   
  ],
  tags: [
    
  ],
  status: ""
}:
selectedPet
)

const [tags, setTags] = React.useState(selectedPet.tags.map((tag)=>tag.name));


const handleTagsChange = (event) => {
  const {
    target: { value },
  } = event;
  setTags(
    typeof value === 'string' ? value.split(',') : value,
  );

  const tagArray = value.map((tag)=>{return {name:tag}})
  setPet((prevState) => {
    return {
      ...prevState,
      tags: tagArray,
    };
  });
};

const handleNameChange = (event) => {
  const { name, value } = event.target;
  setPet((prevState) => {
    return {
      ...prevState,
      name: value,
    };
  });
};

const handleStatusChange = (event) => {
  const { name, value } = event.target;
  setPet((prevState) => {
    return {
      ...prevState,
      status: value
    };
  });
};

const handleCategoryChange = (event) => {
  const { name, value } = event.target;
  setPet((prevState) => {
    return {
      ...prevState,
      category: {...pet.category,name:value},
    };
  });
};


const onSumbit=()=> {
  if (modalType == 'Add') {
    apiService.addPet(pet,'')
    //refreshPetList('Add',pet)
  }
  else if (modalType== 'Edit') {
    apiService.updatePet(pet,'')
    handleEditPet()
    //refreshPetList('Edit',pet)
  }
  onClose()
}

  return (
    <div>
      <Dialog open={open} onClose={()=>onClose()}>
        <DialogTitle>{modalType== 'Add'?"Add PET":"Edit PET"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form to add new Pet.
          </DialogContentText>
         
          <TextField
            margin="dense"
            id="name"
            name="name"
            value={pet.name}
            onChange={handleNameChange}
            label="name"
            type="text"
            fullWidth
           
          />
          <TextField
            margin="dense"
            id="category"
            name="category"
            value={pet.category.name}
            onChange={handleCategoryChange}
            label="category"
            type="text"
            fullWidth
           
          />
           <div>
      <FormControl  fullWidth>
        <InputLabel id="tag-label" sx={{top: '11px'}}>Tag</InputLabel>
        <Select
          labelId="tag-label"
          id="tag"
          multiple
          value={tags}
          onChange={handleTagsChange}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{marginTop: '10px'}}
        >
          {petTags.map((tag) => {
            return (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            )

          })}
        </Select>
      </FormControl>
      <FormControl  fullWidth>
        <InputLabel id="status-label" sx={{top: '10px'}}>Status</InputLabel>
      <Select
          labelId="status-label"
          id="status"
          value={pet.status}
          label="Status"
          onChange={handleStatusChange}
          sx={{marginTop: '11px'}}
        >
          <MenuItem value={'available'}>Available</MenuItem>
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'sold'}>Sold</MenuItem>
        </Select>
        </FormControl>
    </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose()} sx={{backgroundColor:'green',color:'white'}}>Cancel</Button>
          <Button onClick={onSumbit} sx={{backgroundColor:'green',color:'white'}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(PetsModal)