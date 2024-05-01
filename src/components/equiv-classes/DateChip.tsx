import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AnySoaRecord } from 'dns';
import { Grid } from '@mui/material';
import { DataRange } from '../../models/DataRange';
import dayjs from 'dayjs';

function DateChip(props: {range: DataRange, setRange: (newRange: DataRange) => void}) {
  
  const [chips, setChips] = useState<{id: string, label: string}[]>([]);
  
    useEffect(() => {
      let res = props.range.v3.split('][')
      res = res.map(r => r.replaceAll('[', '').replaceAll(']',''))
      let result  = res.map(r => { return {id: r, label: r}})
      setChips((result.length == 1 && !result[0].id) ? [] : result)
    }, [props.range])


  const handleDelete = (chipToDelete: any) => () => {
    const updatedRange = '[' + chips.filter(chip => chip.id !== chipToDelete.id).map(chip => chip.label).join('][') + ']'
    console.log('updatedRange:', updatedRange)
    props.setRange({...props.range, v3: updatedRange != '[]' ? updatedRange : ''})
  };

  return (
    <Grid container spacing={1} margin={'8px'} marginRight={'16px'} style={{paddingRight: '16px'}}>
      {
        chips.length > 0 ?
          <Grid item key={'header'} color={'black'} marginTop={'8px'}>
            Dates also to be included:
          </Grid>
        : null
      }
    {chips.map((chip) => ( 
      <Grid item key={chip.id}>
       <Chip
          key={chip.id}
          label={dayjs(chip.label).format('MM/DD/YYYY')}
          onDelete={handleDelete(chip)}
        />
      </Grid>
    ))}
  </Grid>
  );
}

export default DateChip;