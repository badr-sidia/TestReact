import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import apiService from '../../api/pets';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props) {
    const { open, onClose, selectedPet, refreshPetList } = props
  

  const handleClose = () => {
    onClose();
  }; 

  const deletePetApi = async (selectedPet) => {

    try {
      const result = await apiService.deletePet('/'+selectedPet.id);
      refreshPetList('Delete',selectedPet);
      onClose();

    } catch (err) {
      console.log(err)
    } 
  };  
 
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose} 
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Disagree</Button>
          <Button  onClick={()=>deletePetApi(selectedPet)} >Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}