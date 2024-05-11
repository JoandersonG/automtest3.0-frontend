import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import { Parameter } from '../../models/Parameter';

function ParamChip(props: {parameters: Parameter[]}) {
  
  return(
    <Grid container spacing={0.5} marginRight={'16px'} style={{paddingRight: '16px'}}>
      {
        props.parameters.map(p => {
          return <Grid item key={p.identifier}>
          <Chip
            key={p.identifier}
            label={p.name + (p.type ? '(' + p.type + ')' : '')}
            style={{backgroundColor: 'transparent', border: '1px solid rgba(1, 1, 1, 0.5)'}}
          />
         </Grid>
        })
      }
  </Grid>
  );
}

export default ParamChip;