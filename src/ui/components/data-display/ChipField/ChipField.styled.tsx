import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
// import { ChipFieldProps } from './';

export const ChipsContainer = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    list-style-type: none;
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    background-color: ${({ theme }) => theme.palette.grey[50]};
    color: ${({ theme }) => theme.palette.text.secondary};
    border: 1px solid ${({ theme }) => theme.palette.grey[100]};
    box-sizing: border-box;
    min-height: 68px;
`;

export const ChipStyled = styled(Chip)`
    &.MuiChip-root {
        height: auto;
        padding: ${({ theme }) => theme.spacing(1, 2)};
        border: 1px solid ${({ theme }) => theme.palette.grey[100]};
        border-radius: ${({ theme }) => theme.shape.borderRadius};
        color: ${({ theme }) => theme.palette.text.secondary};
        background-color: white;

        .MuiChip-Label {
            padding: 0;
            white-space: pre-wrap;
        }

        .MuiChip-deleteIcon {
            font-size: 14px;
            margin-left: ${({ theme }) => theme.spacing(3)};
        }
    }
`;
