import {
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import { useContratacao } from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import { BrowserService } from 'data/services/BrowserService';
import { TextFormatService } from 'data/services/TextFormatService';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import DataList from 'ui/components/data-display/DataList/DataList';
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
            tamanhoCasa,
            tipoLimpeza,
            totalPrice,
            podemosAtender,
        } = useContratacao(),
        dataAtendimento = serviceForm.watch('faxina.data_atendimento');

    useEffect(() => {
        BrowserService.scrollToTop();
    }, [step]);

    if (!servicos || servicos.length < 1) {
        return (
            <Container sx={{ textAlign: 'center', my: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                items={breadCrumbItems}
                selected={breadCrumbItems[step - 1]}
            />
            {isMobile && [2, 3].includes(step) && (
                <DataList
                    header={
                        <Typography color="primary" sx={{ fontWeight: 'thin' }}>
                            O valor total do serviço é{' '}
                            {TextFormatService.currency(totalPrice)}
                        </Typography>
                    }
                    body={
                        <>
                            {tipoLimpeza?.nome}
                            <br />
                            Tamanho: {tamanhoCasa.join(', ')}
                            <br />
                            Data: {dataAtendimento}
                        </>
                    }
                />
            )}

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

            {step === 3 && (
                <PageTitle
                    title="Informe os dados do cartão para pagamento"
                    subtitle="Será feita uma reserva, mas o valor só será descontado quando você confirmar a presença do(a) diarista"
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
                                <DetalhesServico
                                    servicos={servicos}
                                    comodos={tamanhoCasa.length}
                                    podemosAtender={podemosAtender}
                                />
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
                                    description: [tipoLimpeza.nome],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Tamanho',
                                    description: tamanhoCasa,
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Data',
                                    description: [dataAtendimento as string],
                                    icon: 'twf-check-circle',
                                },
                            ]}
                            footer={{
                                text: TextFormatService.currency(totalPrice),
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
