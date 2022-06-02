import React, { useState, useEffect ,useCallback } from 'react';
import PetsModal from '../sharedComponents/pets/PetsModal';
import ConfirmDialog from '../sharedComponents/ConfirmDialog';
import TableComponent from '../sharedComponents/TableComponent';
import apiService from '../../api/pets';
import * as styles from './ListPets.css'
export default function ListPets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState({
      category: {
        id: 0,
        name: ""
      },
      name: "",
      photoUrls: [
       
      ],
      tags: [
        
      ],
      status: ""
    }
  );
  const [status, setStatus] = React.useState('available');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [petUpdated,setPetUpdated] = useState(false)
  const [petDeleted,setPetDeleted] = useState(false)

   const handleOpenModal = useCallback((modalType) => {
    setOpenModal(true);
    if (modalType=='Add') setModalType('Add')
    else if (modalType=='Edit') setModalType('Edit')
  }, [openModal]); 

  const handleOpenConfirm = ()=>setOpenConfirm(true)

  const handleCloseConfirm = ()=>setOpenConfirm(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusChange = (event) => {
    console.log('hand status')
    setStatus(event.target.value);
  };

  const selectCurrentPet = (currentPet) => {
    setSelectedPet(currentPet)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditPet = () => setPetUpdated(!petUpdated)

  const refreshPetList = (action,selectedPet)=>{
    const newPetList = []
    if (action=='Add') newPetList = pets.filter((pet)=>pet.id!=selectedPet.id)
    else if(action=='Edit')  newPetList = pets.filter((pet)=>pet.id!=selectedPet.id)
    else if (action=="Delete")  newPetList = pets.filter((pet)=>pet.id!=selectedPet.id)
   
    setPets(newPetList)
  }
  const handleCloseModal = ()=>setOpenModal(false)

    useEffect(() => {
      console.log('render!');
      const fetchPets = async () => {
        try {
          setLoading(true);
          const petsData = await apiService.getPetsByStatus('/findByStatus?status='+status);
          setPets(petsData);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };  
      fetchPets();
    },[status,petUpdated])

  return (
    <>
    <div style={{marginTop:"20px"}}>
    <TableComponent handleOpenModal={handleOpenModal}
    status={status} pets={pets} page={page} rowsPerPage={rowsPerPage} 
    handleOpenConfirm={handleOpenConfirm}
    handleStatusChange={handleStatusChange}
    selectCurrentPet={selectCurrentPet}
    handleChangePage={handleChangePage}
    handleChangeRowsPerPage={handleChangeRowsPerPage}/>
    </div>

    {openModal&&(<PetsModal 
                 modalType={modalType} 
                 selectedPet={selectedPet} 
                 open={openModal} 
                 onClose={handleCloseModal}
                 refreshPetList={refreshPetList}
                 handleEditPet={handleEditPet}
                 />)
                 }
     {openConfirm&&(<ConfirmDialog 
                     open={openConfirm} 
                     selectedPet={selectedPet}  
                     onClose={handleCloseConfirm} 
                     refreshPetList={refreshPetList}/>)
                 }
    </>
    
    
  );
}