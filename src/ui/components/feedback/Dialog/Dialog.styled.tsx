import { styled } from '@mui/material/styles';
import {
    Dialog as MuiDialog,
    DialogTitle as MuiDialogTitle,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    IconButton as MuiIconButton,
} from '@mui/material';
// import { DialogProps } from './';

export const Component = styled('div')`
    background-color: white;
`;

export const DialogContainer = styled(MuiDialog)``;

export const DialogTitle = styled(MuiDialogTitle)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    position: relative;

    .MuiTypography-root {
        font-size: ${({ theme }) => theme.typography.body1.fontSize};
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        &.MuiDialog-root {
            padding: ${({ theme }) => theme.spacing(1.5)};
        }
    }
`;

export const DialogSubtitle = styled('h3')`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    margin: ${({ theme }) => theme.spacing(0, 0, 3)};
`;

export const DialogActions = styled(MuiDialogActions)`
    ${({ theme }) => theme.breakpoints.up('md')} {
        &.MuiDialogActions-root {
            position: relative;
            padding: ${({ theme }) => theme.spacing(3, 6)};
            gap: ${({ theme }) => theme.spacing(2)};

            &::before {
                content: '';
                height: 1px;
                background-color: ${({ theme }) => theme.palette.grey[200]};
                position: absolute;
                top: 0;
                left: ${({ theme }) => theme.spacing(6)};
                right: ${({ theme }) => theme.spacing(6)};
            }
        }
    }
`;

export const DialogContent = styled(MuiDialogContent)`
    &.MuiDialogContent-root {
        padding: ${({ theme }) => theme.spacing(1.5)};

        ${({ theme }) => theme.breakpoints.up('md')} {
            &.MuiDialogContent-root {
                padding: ${({ theme }) => theme.spacing(3, 6, 0)};
            }
        }
    }
`;

export const CLoseButton = styled(MuiIconButton)`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    i {
        font-size: 16px;
        color: ${({ theme }) => theme.palette.primary.contrastText};
    }
`;
