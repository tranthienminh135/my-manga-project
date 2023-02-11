import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const ExcelComponent = () => {
    const handleChange = (e: any) => {};
    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <Container className="mt-5">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={'age'}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Container>
        </div>
    );
};
