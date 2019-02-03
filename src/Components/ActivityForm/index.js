import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { ACTIVITY_CATEGORIES } from '../../constant'

const ActivityForm = ({
  handleSubmit,
  handleActivityInput,
  handleCategoryToggle,
  name,
  details,
  categories,
}) => {
return (
<form onSubmit={handleSubmit}>
  <TextField 
    id="name"
    fullWidth
    value={name} 
    placeholder="What would you like to do?"
    onChange={handleActivityInput} />
  <TextField 
    id="details"
    multiline
    rows="4"
    value={details} 
    placeholder="OPTIONAL - add some details"
    onChange={handleActivityInput} />

  <Button variant="raised" color="primary" type="submit">Submit</Button>
  {
    Object.keys(ACTIVITY_CATEGORIES).map((category, index) => 
      <Chip 
        key={category}
        variant={categories.includes(category) ? "default" : "outlined"}
        color={categories.includes(category) ? "secondary" : "default"}
        onClick={() => handleCategoryToggle(category)} 
        label={ACTIVITY_CATEGORIES[category]} />
    )
        }
    </form>
  )
}

export default ActivityForm
