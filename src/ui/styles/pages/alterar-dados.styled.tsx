import { styled } from '@mui/material/styles';
// import { } from '@mui/material';

export const FormContainer = styled('div')`
    max-width: 689px;
    margin: 0 auto;
`;

export const UserPicture = styled('label')`
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ theme }) => theme.spacing(18)};
    height: ${({ theme }) => theme.spacing(18)};
    background-color: ${({ theme }) => theme.palette.grey[100]};
    border-radius: 100%;
    cursor: pointer;

    &::before {
        content: 'Foto';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${({ theme }) => theme.palette.text.secondary};
    }

    &:hover::after {
        content: 'Selecionar';
        display: flex;
    }

    &::after {
        display: none;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.palette.common.white};
        content: 'Selecionar';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }

    i {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 17px;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        padding: ${({ theme }) => theme.spacing()};
        border-radius: 100%;
        z-index: 3;
    }

    input {
        display: none;
    }

    img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        border-radius: 100%;
    }
`;
