import { Box, Button, Paper, Typography } from '@mui/material';
import { useContratacao } from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.styled';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import Link from 'ui/components/navigation/Link/Link';
import CadastroCliente, { LoginCliente } from './_cadastro-cliente';
import DetalhesServico from './_detalhes-servico';
import InformacoesPagamento from './_informacoes-pagamento';

// import { Component } from './_contratacao.styled';

const Contratacao: React.FC = () => {
    const isMobile = useIsMobile();
    const {
        step,
        setStep,
        breadCrumbItems,
        serviceForm,
        clientForm,
        loginForm,
        paymentForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        onLoginFormSubmit,
        onPaymentFormSubmit,
        servicos,
        setHasLogin,
        hasLogin,
        loginError,
    } = useContratacao();

    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                items={breadCrumbItems}
                selected={breadCrumbItems[step - 1]}
            />
            {step === 1 && (
                <PageTitle title="Nos conte um pouco sobre o serviço!" />
            )}

            {step === 2 && (
                <PageTitle
                    title="Precisamos conhecer um pouco sobre você!"
                    subtitle={
                        !hasLogin ? (
                            <span>
                                Caso já tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(true)}>
                                    clique aqui
                                </Button>{' '}
                            </span>
                        ) : (
                            <span>
                                Caso não tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(false)}>
                                    clique aqui
                                </Button>{' '}
                            </span>
                        )
                    }
                />
            )}

            <UserFormContainer>
                <PageFormContainer fullWidth={step === 4}>
                    <Paper sx={{ padding: 4 }}>
                        <FormProvider {...serviceForm}>
                            <form
                                onSubmit={serviceForm.handleSubmit(
                                    onServiceFormSubmit
                                )}
                                hidden={step !== 1}
                            >
                                <DetalhesServico servicos={servicos} />
                            </form>
                        </FormProvider>

                        {step === 2 && hasLogin && (
                            <FormProvider {...loginForm}>
                                <form
                                    onSubmit={loginForm.handleSubmit(
                                        onLoginFormSubmit
                                    )}
                                >
                                    {loginError && (
                                        <Typography
                                            color={'error'}
                                            align="center"
                                            sx={{ mb: 2 }}
                                        >
                                            {loginError}
                                        </Typography>
                                    )}
                                    <LoginCliente onBack={() => setStep(1)} />
                                </form>
                            </FormProvider>
                        )}

                        <FormProvider {...clientForm}>
                            <form
                                onSubmit={clientForm.handleSubmit(
                                    onClientFormSubmit
                                )}
                                hidden={step !== 2 || hasLogin}
                            >
                                <CadastroCliente onBack={() => setStep(1)} />
                            </form>
                        </FormProvider>

                        {step === 3 && (
                            <FormProvider {...paymentForm}>
                                <form
                                    onSubmit={paymentForm.handleSubmit(
                                        onPaymentFormSubmit
                                    )}
                                >
                                    <InformacoesPagamento />
                                </form>
                            </FormProvider>
                        )}

                        {step === 4 && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    color="secondary"
                                    sx={{ fontSize: 82 }}
                                >
                                    <i className="twf-check-circle" />
                                </Typography>
                                <Typography
                                    color="secondary"
                                    sx={{ fontSize: 22, mb: 3 }}
                                >
                                    Pagamento realizado com sucesso
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    sx={{ maxWidth: 410, mb: 3, mx: 'auto' }}
                                >
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Consequatur architecto,
                                    quasi quod molestiae dolor iusto illo harum?
                                    Tempore eveniet, quo corrupti iure molestias
                                    doloremque reprehenderit? Ipsam animi rerum
                                    repudiandae? Nulla?
                                </Typography>
                                <Link
                                    href="/diarias"
                                    Component={Button}
                                    mui={{
                                        color: 'secondary',
                                        variant: 'contained',
                                    }}
                                >
                                    Ir para minhas diárias
                                </Link>
                            </Box>
                        )}
                    </Paper>

                    {!isMobile && step !== 4 && (
                        <SideInformation
                            title="Detalhes"
                            items={[
                                {
                                    title: 'Tipo',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Tamanho',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Data',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                            ]}
                            footer={{
                                text: 'R$80,00',
                                icon: 'twf-credit-card',
                            }}
                        />
                    )}
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;
