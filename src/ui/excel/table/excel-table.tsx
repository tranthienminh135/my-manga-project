import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { ExportCSV } from '../export-to-csv';
import { EnhancedTableHead } from './table-head';
import { EnhancedTableToolbar } from './table-toolbar';

interface Data {
    id: number;
    name: string;
    idCard: string;
    contractId?: string;
    time?: Date;
    salary: number;
}

function createData(id: number, name: string, idCard: string, time: Date, contractId: string, salary: number): Data {
    return {
        id,
        name,
        idCard,
        time,
        contractId,
        salary,
    };
}

const rows: Data[] = [
    createData(0, 'Cupcake', '1', new Date(), '4', 4.3),
    createData(1, 'Cupcake1', '2', new Date(), '6', 4.3),
    createData(2, 'Cupcake2', '3', new Date(), '8', 4.3),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly Data[], comparator: (a: T, b: T) => number): Data[] {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]) as Data[];
}

export default function EnhancedTable(props: any) {
    const { sheetData, excelFunc } = props;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('idCard');
    const [selected, setSelected] = React.useState<readonly any[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [tableData, setTableData] = React.useState<Data[]>(rows);

    React.useEffect(() => {
        if (sheetData && excelFunc.hasValue) {
            const handleExcelData = () => {
                switch (excelFunc.value) {
                    case 'TOTAL':
                        handleTotalPrice(sheetData);
                        break;
                    case 'TOTAL_MONTH':
                        let arr: any[] = [];
                        Object.keys(sheetData).forEach((key: string) => {
                            arr = structuredClone([...arr, ...sheetData[key]]);
                        });
                        const newArr = arr.map((data: any) => {
                            const temp = data.time.split('/');
                            const year = temp[2];
                            const month = temp[1];
                            const newDate = `${year}-${month}`;
                            return {
                                ...data,
                                time: new Date(newDate),
                            };
                        });

                        for (let i = 0; i < newArr.length; i++) {
                            const e1 = newArr[i];
                            for (let j = i + 1; j < newArr.length; j++) {
                                const e2 = newArr[j];
                                if (e1.idCard === e2.idCard) {
                                    if (e1.time.getFullYear() === e2.time.getFullYear()) {
                                        if (e1.time.getMonth() === e2.time.getMonth()) {
                                            e1.salary = e1.salary + e2.salary;
                                            e1.contractId = '';
                                            newArr.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                            }
                        }
                        const temp = newArr.map((data: any, index: number) => {
                            return {
                                ...data,
                                id: index + 1,
                                contractId: '',
                            };
                        });
                        setTableData(temp);
                        break;
                    default:
                        break;
                }
            };
            handleExcelData();
        }
    }, [sheetData, excelFunc]);

    const handleExcelData = () => {
        switch (excelFunc.value) {
            case 'TOTAL':
                handleTotalPrice(sheetData);
                break;
            case 'TOTAL_MONTH':
                let arr: any[] = [];
                Object.keys(sheetData).forEach((key: string) => {
                    arr = structuredClone([...arr, ...sheetData[key]]);
                });
                const newArr = arr.map((data: any) => {
                    const temp = data.time.split('/');
                    const year = temp[2];
                    const month = temp[1];
                    const newDate = `${year}-${month}`;
                    return {
                        ...data,
                        time: new Date(newDate),
                    };
                });

                for (let i = 0; i < newArr.length; i++) {
                    const e1 = newArr[i];
                    for (let j = i + 1; j < newArr.length; j++) {
                        const e2 = newArr[j];
                        if (e1.idCard === e2.idCard) {
                            if (e1.time.getFullYear() === e2.time.getFullYear()) {
                                if (e1.time.getMonth() === e2.time.getMonth()) {
                                    e1.salary = e1.salary + e2.salary;
                                    e1.contractId = '';
                                    newArr.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                }
                const temp = newArr.map((data: any, index: number) => {
                    return {
                        ...data,
                        id: index + 1,
                        contractId: '',
                    };
                });
                setTableData(temp);
                break;
            default:
                break;
        }
    };

    const handleTotalPrice = (data: any) => {
        let arr: any[] = [];
        Object.keys(data).forEach((key: string) => {
            arr = structuredClone([...arr, ...data[key]]);
        });

        for (let i = 0; i < arr.length; i++) {
            const e1 = arr[i];
            for (let j = i + 1; j < arr.length; j++) {
                const e2 = arr[j];
                if (e1.idCard === e2.idCard) {
                    e1.salary = e1.salary + e2.salary;
                    e1.contractId = ``;
                    e1.time = ``;
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        const temp = arr.map((data: any, index: number) => {
            return {
                id: index,
                name: data.name,
                idCard: data.idCard,
                salary: data.salary,
            };
        });
        setTableData([...temp]);
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tableData.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
        console.log(selected.indexOf(id));
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const isSelected = (id: any) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleSearchCallBack = (value: string) => {
        if (value) {
            const filterData = tableData.filter((data: any) => data.name.indexOf(value) !== -1);
            setTableData(filterData);
        } else {
            handleExcelData();
        }
    };

    const renderBootstrapAlertSalary = (salary: number, exValue: string) => {
        return salary >= 2000000 && exValue === 'TOTAL_MONTH' ? 'text-danger fw-bold' : '';
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    functionName={excelFunc.name}
                    searchCallBack={handleSearchCallBack}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={tableData.length}
                        />
                        <TableBody>
                            {stableSort(tableData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                className={renderBootstrapAlertSalary(row.salary, excelFunc.value)}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={renderBootstrapAlertSalary(row.salary, excelFunc.value)}
                                            >
                                                {row.idCard}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={renderBootstrapAlertSalary(row.salary, excelFunc.value)}
                                            >
                                                {row.contractId ? row.contractId : 'Không có dữ liệu'}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={renderBootstrapAlertSalary(row.salary, excelFunc.value)}
                                            >
                                                {row.time ? row.time.toLocaleDateString() : 'Không có dữ liệu'}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={renderBootstrapAlertSalary(row.salary, excelFunc.value)}
                                            >
                                                {row.salary
                                                    ? row.salary.toLocaleString('it-IT', {
                                                          style: 'currency',
                                                          currency: 'VND',
                                                      })
                                                    : 'Dữ liệu không hợp lệ'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                            marginTop: '1rem !important',
                        },
                    }}
                    labelRowsPerPage="Hàng trên mỗi trang"
                />
            </Paper>
            <div className="mt-2 mb-2">
                <ExportCSV csvData={tableData} fileName={excelFunc.name} />
            </div>
        </Box>
    );
}
