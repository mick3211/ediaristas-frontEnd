import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
    FormControl,
    InputLabel,
    SelectProps as MuiSelectProps,
} from '@mui/material';
import { SelectStyled } from './Select.styled';

export interface SelectProps extends MuiSelectProps {
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    children,
    style,
    ...props
}: SelectProps) => {
    const [elementId, setElementId] = useState('');

    useEffect(() => {
        if (window !== undefined) setElementId(uuid());
    }, []);

    return (
        <FormControl style={style} variant={'outlined'}>
            <InputLabel id={elementId}>{label}</InputLabel>
            <SelectStyled labelId={elementId} label={label} {...props}>
                {children}
            </SelectStyled>
        </FormControl>
    );
};

export default Select;
