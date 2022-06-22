import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/formSchemaService';
import {
    CadastroClienteFormDataInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import { useApi } from '../useApi';

export function useContratacao() {
    const [step, setStep] = useState(1);
    const [hasLogin, setHasLogin] = useState(false);
    const [loginError, setLoginError] = useState('');
    const breadCrumbItems = [
        'Detalhes da diária',
        'Identificação',
        'Pagamento',
    ];
    const servicos = useApi<ServicoInterface[]>('/api/servicos').data;

    const serviceForm = useForm<NovaDiariaFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.address().concat(
                FormSchemaService.detalhesServico()
            )
        ),
    });

    const clientForm = useForm<CadastroClienteFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.userData().concat(FormSchemaService.newContact())
        ),
    });

    const loginForm = useForm<LoginFormDataInterface>({
        resolver: yupResolver(FormSchemaService.login()),
    });

    const paymentForm = useForm<PagamentoFormDataInterface>({
        resolver: yupResolver(FormSchemaService.payment()),
    });

    const onServiceFormSubmit: SubmitHandler<NovaDiariaFormDataInterface> = (
        data
    ) => {
        console.log(data);
    };

    const onClientFormSubmit: SubmitHandler<
        CadastroClienteFormDataInterface
    > = (data) => {
        console.log(data);
    };

    const onLoginFormSubmit: SubmitHandler<LoginFormDataInterface> = (data) => {
        console.log(data);
    };

    const onPaymentFormSubmit: SubmitHandler<PagamentoFormDataInterface> = (
        data
    ) => {
        console.log(data);
    };

    return {
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
        hasLogin,
        setHasLogin,
        loginError,
    };
}
