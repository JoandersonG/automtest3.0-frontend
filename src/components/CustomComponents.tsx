import { TextField } from "@mui/material";

export function buildTextField(label: any, value: string, onChange: any, smallSize?: boolean, disabled?: boolean) {
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
                          color: 'rgba(1, 1, 1, 0.5)',  // Custom color for label
                        },
                        '& .MuiInputLabel-root': {
                          '&.Mui-disabled': {
                            color: 'rgba(1, 1, 1, 0.5)',  // Custom color for label
                            borderColor: 'rgba(1, 1, 1, 0.5)',  // Custom color for label
                            fontSize: '14px',
                          }
                        },
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-disabled': {
                            '& fieldset': {
                              borderColor: 'rgba(1, 1, 1, 0.5)',  // Custom color for border
                              color: 'rgba(1, 1, 1, 0.5)',  // Custom color for border
                            },
                            '& .MuiInputBase-input': {
                              color: 'rgba(1, 1, 1, 0.5)'  // Custom color for the text
                            }
                          }
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
                    fullWidth
                    style={{
                        marginBottom: '12px'
                    }}
                    />
    }
}
