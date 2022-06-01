import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';
// import { SelectProps } from './';

export const SelectStyled = styled(Select)`
    &.MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }

    .MuiOutlinedInput-notchedOutlined {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
