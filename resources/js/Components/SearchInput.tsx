import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ChangeEvent, ReactNode } from 'react';

type SearchInputProps = {
    value: string;
    onChange?: (value: string) => void;
    onChangeEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
    fullWidth?: boolean;
    placeholder?: string;
    icon?: ReactNode;
    size?: 'small' | 'medium';
};

function SearchInput(props: SearchInputProps) {
    const {
        value,
        onChange,
        onChangeEvent,
        fullWidth,
        placeholder,
        icon,
        size = 'medium',
    } = props;
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }

        if (onChangeEvent) {
            onChangeEvent(event);
        }
    };

    return (
        <TextField
            variant="outlined"
            size={size}
            fullWidth={fullWidth}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            {icon || <SearchOutlinedIcon fontSize={size} />}
                        </InputAdornment>
                    ),
                    inputProps: { autoComplete: 'off' },
                },
            }}
        />
    );
}

export default SearchInput;
