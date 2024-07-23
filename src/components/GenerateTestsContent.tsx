
import { useState } from "react";
import { Method } from "../models/Method";
import { ProgrammingLanguages } from "../models/ProgrammingLanguages";
import { buildTextField } from "./CustomComponents";
import { Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import axios from "axios";
import { v1 as uuidv1 } from 'uuid';
import ValidationErrorSnackbar from "./ValidationErrorComponent";

export default function GenerateTestsContent(props: {methods: Method[], directory: string, setDirectory: any}) {

    // const [directory, setDirectory] = useState('');
    const [DiretoryshowError, setDiretoryShowError] = useState(false);
    const [DiretoryErrorMsg, setDiretoryErrorMsg] = useState('');
    const [LanguageShowError, setLanguageShowError] = useState(false);
    const [genResult, setGenResult] = useState('');
    const [programmingLanguage, setprogrammingLanguage] = useState('')

    function validateAndSendReq() {
        setDiretoryErrorMsg('');
        setDiretoryShowError(false);
        setLanguageShowError(false);

        if (props.directory == '') {
            setDiretoryErrorMsg('Please, paste the directory where to save the files');
            setDiretoryShowError(true);
            return;
        }
        if (programmingLanguage == '') {
            setLanguageShowError(true);
            return;
        }

        axios.post('http://127.0.0.1:5000/api/generate_tests', JSON.stringify({directory: props.directory, methods: props.methods, programmingLanguage: programmingLanguage}), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("response=", response.data);
            setGenResult('Testes gerados com sucesso');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setGenResult('Ocorreu um erro ao gerar os testes');
        });
        
    }

    return (
        
        <div style={{fontSize: '20px', textAlign: 'justify', color: 'black'}}>
        <ValidationErrorSnackbar open={genResult != ''} message={genResult} changeOpenState={() => setGenResult('')} />
           Paste the location where to save the test files and choose a programming language:

           <div style={{
                            paddingRight: '0px',
                            paddingTop: '215px',
                            display: 'flex',
                            width: '690px',
                            alignItems: 'center',
                            borderRadius: '5px',
                        }}>
                <div style={{marginTop:'12px', marginRight:'16px', width: '100%'}}>
                    {buildTextField("Directory", props.directory, (v: any) => props.setDirectory(v.target.value), false, false, DiretoryshowError, DiretoryErrorMsg)}
                    {
                        LanguageShowError? 
                            <div style={{height: '65px'}} />
                        :   <div />
                    }
                </div>
                <div>
                    <FormControl
                    variant="outlined"
                    error = {LanguageShowError}
                    style={{ marginTop: '0px', marginRight: '16px', width: '150px' }}>
                        <InputLabel htmlFor="outlined-basic">language</InputLabel>
                        <Select
                            id="outlined-basic"
                            value={programmingLanguage}
                            onChange={val => setprogrammingLanguage(val.target.value)}
                            label="Programming language"
                            style={{ height: '55px' }}>
                            
                            {ProgrammingLanguages.map((rt: any, index: any) => (
                            <MenuItem key={index} value={rt.value}>
                                {rt.text}
                            </MenuItem>
                            ))}
                        </Select>
                        {LanguageShowError && <FormHelperText style={{width: "140px"}}>Please, choose a programming language</FormHelperText>}
                    </FormControl>
                    {
                        DiretoryshowError || LanguageShowError? 
                            <div style={{height: '23px'}} />
                        :   <div />
                    }
                </div>
                <div>
                    <Button 
                        variant="outlined" 
                        color="success" 
                        disableElevation 
                        onClick={() => validateAndSendReq()}
                        style={{height: '55px', marginTop: '0px'}}>
                            Generate tests
                    </Button>
                    {
                        DiretoryshowError? 
                            <div style={{height: '23px'}} />
                        :   LanguageShowError?
                            <div style={{height: '65px'}} />
                        :   <div />
                    }
                </div>
            </div>
        </div>
    )
}
