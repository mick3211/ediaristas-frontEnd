import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { FormFieldsContainer } from '@styles/pages/recuperar-senha.styled';
import { Container, Snackbar } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import TextField from 'ui/components/inputs/TextField/TextField';
import { LoginButton } from '@styles/pages/login.styled';
import { useRecuperarSenha } from 'data/hooks/pages/useRecuperarSenha.page';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'recuperar-senha',
        },
    };
};

const RecuperarSenha: React.FC = () => {
    const {
        router,
        email,
        setEmail,
        pedirTokenRecuperacao,
        mensagemSnack,
        setMensagemSnack,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        resetarSenha,
    } = useRecuperarSenha();

    return (
        <Container>
            <PageTitle title="Recuperar senha" />
            {router.query.token ? (
                <FormFieldsContainer>
                    <TextField
                        label="Digite seu email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <TextField
                        label="Digite a nova senha"
                        type="password"
                        fullWidth
                        value={senha}
                        onChange={(ev) => setSenha(ev.target.value)}
                    />
                    <TextField
                        label="Confirme a senha"
                        type="password"
                        fullWidth
                        value={confirmarSenha}
                        onChange={(ev) => setConfirmarSenha(ev.target.value)}
                    />
                    <LoginButton
                        variant="contained"
                        color="secondary"
                        onClick={resetarSenha}
                    >
                        Redefinir senha
                    </LoginButton>
                </FormFieldsContainer>
            ) : (
                <FormFieldsContainer>
                    <TextField
                        label="Digite seu email"
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <LoginButton
                        variant="contained"
                        color="secondary"
                        onClick={pedirTokenRecuperacao}
                    >
                        Solicitar email
                    </LoginButton>
                </FormFieldsContainer>
            )}

            <Snackbar
                open={mensagemSnack.length > 0}
                message={mensagemSnack}
                autoHideDuration={5000}
                onClose={() => setMensagemSnack('')}
            />
        </Container>
    );
};

export default RecuperarSenha;
