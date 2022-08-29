import { styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

export const CardsContainer = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(2)};

    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            'details details'
            'houseclener client';
        gap: ${({ theme }) => theme.spacing(3)};
    }
`;

export const JobDetails = styled(Paper)`
    ${({ theme }) => theme.palette.text.secondary};

    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-area: details;
        padding: ${({ theme }) => theme.spacing(4)};
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        box-shadow: none;
        margin-bottom: ${({ theme }) => theme.spacing(4)};
    }
`;
export const JobTitle = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing(4)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const UserCard = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing()};
    padding: ${({ theme }) => theme.spacing(4)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        box-shadow: none;
        padding: 0;
    }
`;
export const UserTitle = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;

    ${({ theme }) => theme.breakpoints.down('md')} {
        background-color: ${({ theme }) => theme.palette.grey[100]};
        padding: ${({ theme }) => theme.spacing(3)};
        margin: ${({ theme }) => '0 ' + theme.spacing(-3)};
    }
`;
