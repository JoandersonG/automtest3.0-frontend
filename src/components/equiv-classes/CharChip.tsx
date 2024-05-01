import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataRange } from '../../models/DataRange';

function CharChip(props: {range: DataRange, setRange: any}) {
  
  const [chips, setChips] = useState<{id: string, label: string}[]>([]);
  
     useEffect(() => {
       let res = props.range.v1.split('][')
       res = res.map(r => r.replaceAll('[', '').replaceAll(']',''))
       let result  = res.map(r => { return {id: r, label: r}})
       setChips((result.length == 1 && !result[0].id) ? [] : result)
     }, [props.range])


  const handleDelete = (chipToDelete: any) => () => {
    //props.setValues((values: any) => values.filter(v => v != value))
    const updatedRange = '[' + chips.filter(chip => chip.id !== chipToDelete.id).map(chip => chip.label).join('][') + ']'
    console.log('updatedCharRange:', updatedRange)
    props.setRange({...props.range, v1: updatedRange != '[]' ? updatedRange : ''})
  };

  return (
    <Grid container spacing={1} margin={'8px'} marginRight={'16px'} style={{paddingRight: '16px'}}>
    {chips.map((chip) => ( 
      <Grid item key={chip.id}>
       <Chip
          key={chip.id}
          label={chip.label}
          onDelete={handleDelete(chip)}
        />
      </Grid>
    ))}
  </Grid>
  );
}

export default CharChip;