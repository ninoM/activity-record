import React from 'react'
import ActivityForm from '../ActivityForm'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const FormModal = ({handleClose, editMode, ...props}) => {
  return (
    <Dialog onClose={handleClose} open={editMode}>
      <DialogTitle>Edit activity</DialogTitle>
      <ActivityForm {...props} />
    </Dialog>
  )
}

export default FormModal
