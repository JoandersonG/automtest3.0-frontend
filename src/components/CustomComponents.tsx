import { TextField } from "@mui/material";

export function buildTextField(label: string, value: string, onChange: any, smallSize?: boolean, disabled?: boolean) {
    if (smallSize) {
        return <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value ? value : ''} 
                    onChange={onChange}
                    fullWidth
                    disabled={disabled ? true : false}
                    style={{
                        marginBottom: '12px'
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                          heightValue: 25, // Adjust height here
                          padding: '10px 3px', // Adjust padding here, format: 'top bottom'
                          fontSize: '13px'
                        },
                        '& .MuiInputLabel-root': {
                          top: '-5px', // Adjust label position if needed
                          fontSize: '14px'
                        }
                      }}
                    />
    } else {
        return <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value ? value : ''} 
                    onChange={onChange}
                    fullWidth
                    style={{
                        marginBottom: '12px'
                    }}
                    />
    }
}
