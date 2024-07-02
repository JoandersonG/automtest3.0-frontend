
import { useState } from "react";
import { Method } from "../models/Method";
import { ProgrammingLanguages } from "../models/ProgrammingLanguages";
import { buildTextField } from "./CustomComponents";
import { Button, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { v1 as uuidv1 } from 'uuid';
import ValidationErrorSnackbar from "./ValidationErrorComponent";

export default function GenerateTestsContent(props: {methods: Method[], directory: string, setDirectory: any}) {

    // const [directory, setDirectory] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [genResult, setGenResult] = useState('');
    const [programmingLanguage, setprogrammingLanguage] = useState("java")

    function validateAndSendReq() {
        setErrorMsg('');
        setShowError(false);

        if (props.directory == '') {
            setErrorMsg('Please, paste the directory where to save the files');
            setShowError(true);
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
           Paste the location where to save the test files:

           <div style={{
                            paddingRight: '0px',
                            paddingTop: '215px',
                            display: 'flex',
                            width: '690px',
                            alignItems: 'center',
                            borderRadius: '5px',
                        }}>
                <div style={{marginTop:'12px', marginRight:'16px', width: '100%'}}>
                    {buildTextField("Directory", props.directory, (v: any) => props.setDirectory(v.target.value), false, false, showError, errorMsg)}
                </div>
                <div>
                    <Select
                     id="outlined-basic"
                     variant="outlined" 
                     value={programmingLanguage}
                     label="Programming language"                    
                     onChange={val => setprogrammingLanguage(val.target.value)}>
                    {
                        ProgrammingLanguages.map((rt: any, index:any) => {
                            return <MenuItem value={rt.value}>{rt.text}</MenuItem>
                        })
                    }

                    </Select>
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
                        showError ? 
                            <div style={{height: '21px'}} />
                        :   <div />
                    }
                </div>
            </div>
        </div>
    )
}
