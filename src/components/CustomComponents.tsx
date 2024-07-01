import { TextField } from "@mui/material";

export function buildTextField(label: any, value: string, onChange: any, smallSize?: boolean, disabled?: boolean, error?: boolean, helperText?: string) {
    if (smallSize) {
        return <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value ? value : ''} 
                    onChange={onChange}
                    fullWidth
                    disabled={disabled}
                    style={{
                        marginBottom: '12px',
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                          heightValue: 25, // Adjust height here
                          padding: '10px 3px', // Adjust padding here, format: 'top bottom'
                          fontSize: '13px',
                          color: 'rgba(1, 1, 1, 1)',  // Custom color for label
                        },
                        '& .Mui-disabled': {
                          color: 'rgba(1, 1, 1, 1)',
                          WebkitTextFillColor: 'rgba(1, 1, 1, 1)'
                        },
                      }}
                    />
    } else {
        return <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value ? value : ''} 
                    onChange={onChange}
                    error={error}
                    helperText={helperText ? helperText : ''}
                    fullWidth
                    style={{
                        marginBottom: '12px'
                    }}
                    />
    }
}
