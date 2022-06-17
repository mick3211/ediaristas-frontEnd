import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { PaymentForm } from 'ui/components/inputs/UserForm/UserForm';

// import { Component } from './_informacoes-pagamento.styled';

const InformacoesPagamento: React.FC = () => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Informações de pagamento
            </Typography>
            <PaymentForm />
            <Container sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="contained" color="secondary">
                    Fazer pagamento
                </Button>
            </Container>
        </>
    );
};

export default InformacoesPagamento;
