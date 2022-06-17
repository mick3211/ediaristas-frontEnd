import { Button, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import {
    LoginForm,
    NewContactForm,
    PictureForm,
    UserDataForm,
} from 'ui/components/inputs/UserForm/UserForm';
import { LoginButtonsContainer } from './_cadastro-cliente.styled';

// import { Component } from './_cadastro-cliente.styled';

const CadastroCliente: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados Pessoais
            </Typography>
            <UserDataForm cadastro={true} />

            <Divider sx={{ mb: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Hora da selfie! Envie uma selfie segurando o documento
            </Typography>
            <PictureForm />
            <Typography sx={{ pt: 1, pb: 5 }} variant="body2">
                Essa foto não será vista por ninguém
            </Typography>

            <Divider sx={{ mb: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados de acesso
            </Typography>
            <NewContactForm />

            <Container
                sx={{
                    textAlign: 'right',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    type="button"
                    onClick={onBack}
                    variant="outlined"
                    color="primary"
                >
                    Voltar para detalhes da diária
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                    Ir para pagamento
                </Button>
            </Container>
        </>
    );
};

export const LoginCliente: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <>
            <LoginForm />
            <LoginButtonsContainer>
                <Button
                    type="button"
                    onClick={onBack}
                    variant="outlined"
                    color="primary"
                >
                    Voltar para detalhes da diária
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                    Ir para pagamento
                </Button>
            </LoginButtonsContainer>
        </>
    );
};

export default CadastroCliente;
