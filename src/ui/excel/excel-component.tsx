import { Button, Container, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import ExcelTable from './table/excel-table';

const initState = [
    {
        id: 0,
        name: 'Tính tổng tiền',
        value: 'TOTAL',
    },
    {
        id: 1,
        name: 'Tính tiền từng tháng',
        value: 'TOTAL_MONTH',
    },
];
const initExcelData = {
    value: '',
    hasValue: false,
    name: '',
};
const acceptFileNames = ['xlsx', 'xls'];
const checkFileName = (name: string) => {
    const ag = name.split('.').pop()?.toLocaleLowerCase();
    return acceptFileNames.includes(ag ? ag : '');
};
export const ExcelComponent = () => {
    const [excelFunction, setExcelFunction] = useState(initExcelData);
    const [fileName, setFileName] = useState('');
    const [sheetData, setSheetData] = useState<any>();
    const fileRef = useRef<HTMLInputElement>(null);
    const [enableTable, setEnableTable] = useState(false);

    const handleChange = (e: any) => {
        const { value } = e.target;
        for (let i = 0; i < initState.length; i++) {
            const element = initState[i];
            if (element.value === value) {
                setExcelFunction({
                    value,
                    hasValue: true,
                    name: element.name,
                });
            }
        }
    };
    const handleClick = () => {
        setEnableTable(true);
    };

    const handleReadExcelFile = async (e: any) => {
        const myFile = e.target.files[0];
        if (!myFile) return;

        if (!checkFileName(myFile.name)) {
            alert('Invalid file');
            return;
        }

        const data = await myFile.arrayBuffer();
        readDataFromExcel(data);

        setFileName(myFile.name);
    };

    const readDataFromExcel = (data: any) => {
        const wb = XLSX.read(data);
        let mySheetData: any;

        for (let i = 0; i < wb.SheetNames.length; i++) {
            let sheetName = wb.SheetNames[i];
            const worksheet = wb.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            mySheetData = {
                ...mySheetData,
                [sheetName]: jsonData,
            };
        }
        setSheetData(mySheetData);
    };

    const handleRemoveFile = () => {
        setFileName('');
        setSheetData(undefined);
        if (fileRef && fileRef.current) fileRef.current.value = '';
        setEnableTable(false);
    };

    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <Container className="mt-5 border">
                <Grid container className="p-2" spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <FormControl className="w-100 p-2" size="small">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={excelFunction.value}
                                name="name"
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="" selected disabled>
                                    Chọn chức năng
                                </MenuItem>
                                {initState.map((data: any) => {
                                    return (
                                        <MenuItem key={data.id} value={data.value}>
                                            {data.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <div className="input-group p-2">
                            <input
                                type="file"
                                className="form-control"
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                onChange={handleReadExcelFile}
                                ref={fileRef}
                            />
                            {fileName && (
                                <Button variant="outlined" color="inherit" onClick={handleRemoveFile}>
                                    Xóa
                                </Button>
                            )}
                            {excelFunction.hasValue && fileName && (
                                <Button variant="outlined" onClick={handleClick}>
                                    {excelFunction.name}
                                </Button>
                            )}
                        </div>
                    </Grid>
                    {enableTable && (
                        <Grid item xs={12}>
                            <ExcelTable sheetData={sheetData} excelFunc={excelFunction} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};
