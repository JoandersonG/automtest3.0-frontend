import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField } from "@mui/material";
import { Stack, Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";

const helpText = 
    <div>
        Here, an equivalence class is a tuple of a set of methods parameters and a set of possible return values for those parameters.<br/>
        <br/>
        Observe the following example:
        <br/>
        The method isMaiorDeIdade(inteiro idade), which has as responsibility check whether a person's of legal age, returns true in case the provided age is greater tha or equal to 18 years-old and false otherwise. For that example,  we could define two equivalence classes: 
        <br/>
        1. The class of legal age people, with return value true and, in the parameters set 18 and 65.<br/>
        2. The class of minor age people, with return value false and, as parameter set, 0, 1, 15 and 17, for
        example.<br/>
        3. The class of invalid input, with return value false and parameters -1, -2, 200, 50000.<br/><br/>
            
        With those info, it's possible to define an equivalence class.<br/>
        Now it's your your turn: insert the equivalence classes you decide relevant to each previously mapped
        method.


    </div>

`Here, an equivalence class is a tuple of a set of methods parameters and a set of possible return values for those parameters.
                
Observe the following example:
the method isMaiorDeIdade(inteiro idade), which has as responsibility check whether a person's of legal age, returns true in case the provided age is greater tha or equal to 18 years-old and false otherwise. For that example,  we could define two equivalence classes: 
1. The class of legal age people, with return value true and, in the parameters set 18 and 65.
2. The class of minor age people, with return value false and, as parameter set, 0, 1, 15 and 17, for
example.
3. The class of invalid input, with return value false and parameters -1, -2, 200, 50000.
    
With those info, it's possible to define an equivalence class.
Now it's your your turn: insert the equivalence classes you decide relevant to each previously mapped
method.`
export default function EquivClassList(props: {methods: Method[], showCreateContent: any}) {

    return (
        <div>
            <Box
                sx={{
                    height: 475,
                    overflow: 'auto',
                    paddingRight: '16px',
                    marginTop: '16px'
                }}
            >

            <Accordion 
                elevation={0}
                style={{
                    borderRadius: 5,
                    //border: '1px solid #000',
                    backgroundColor: 'transparent',
                    marginTop: '12px',
                    minHeight: '55px'
                }}>
                <AccordionSummary
                    // expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content">
                <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item xs={9}><Text5 color="black">List of all Equivalence Classes created:</Text5></Grid>
                    <Grid item xs={3}><Button variant="contained" color="info" disableElevation fullWidth style={{height: '35px'}} onClick={() => 1}>Show Help</Button></Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {helpText}
                </AccordionDetails>
            </Accordion>
                        
            {
                props.methods.map(m => m.equivClasses.map(ec => <Entry method={m.name} equivClassName={ec.name} />))
            }
            
        </Box>
        
        <Grid container justifyContent="flex-end" spacing={1} marginTop={1}>
            <Grid item xs={2}>
                <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Go back</Button>
            </Grid> 
            <Grid item xs={4}>
                <Button variant="outlined" color="success" disableElevation fullWidth style={{height: '55px'}} onClick={props.showCreateContent}>Add Equivalence Class</Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Continue to generate tests</Button>
            </Grid>
        </Grid>
        </div>
    )
}

function Entry(props: {method: string, equivClassName: string}) {
    const sxForDisabledFields = {
        '& .Mui-disabled': {
            color: 'rgba(0, 0, 0, 1)',
            WebkitTextFillColor: 'rgba(0, 0, 0, 1)'
        }
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #D3D3D3', 
            borderRadius: '5px',
            padding: '16px',
            marginTop: '16px'
        }}>
            <Stack space={2}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <TextField sx={sxForDisabledFields} disabled fullWidth id="outlined-basic" label={"Method"} variant="outlined" contentEditable={false} value={props.method} style={{ marginBottom: '12px'}}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Edit</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <TextField  sx={sxForDisabledFields} disabled fullWidth id="outlined-basic" label={"Equivalence class"} variant="outlined" contentEditable={false} value={props.equivClassName}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" color="error" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Remove</Button>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    )
}