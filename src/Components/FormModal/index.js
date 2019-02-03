import React from 'react'
import ActivityForm from '../ActivityForm'
import Dialog from '@material-ui/core/Dialog';

const FormModal = ({handleClose, editMode, ...props}) => {
  return (
    <Dialog onClose={handleClose} open={editMode}>
      <ActivityForm {...props} />
    </Dialog>
  )
}

export default FormModal
