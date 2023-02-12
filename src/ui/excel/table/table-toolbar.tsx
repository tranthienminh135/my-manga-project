import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { Button } from '@mui/material';

interface EnhancedTableToolbarProps {
    numSelected: number;
    functionName: string;
    searchCallBack: Function;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, functionName, searchCallBack } = props;
    const [enableFilter, setEnableFilter] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleFilter = () => {
        setEnableFilter(!enableFilter);
    };

    const handleSearch = () => {
        searchCallBack(searchValue);
    };

    const handleSearchValue = (e: any) => {
        const { value } = e.target;
        setSearchValue(value);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : !enableFilter ? (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    {functionName}
                </Typography>
            ) : (
                <div className="input-group" style={{ flex: '1 1 100%' }}>
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Nhập tên..."
                        style={{ width: '50% !important' }}
                        value={searchValue}
                        onChange={handleSearchValue}
                    />
                    <Button variant="outlined" color="inherit" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : !enableFilter ? (
                <Tooltip title="Filter list">
                    <IconButton onClick={handleFilter}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton onClick={handleFilter}>
                        <FilterListOffIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};
