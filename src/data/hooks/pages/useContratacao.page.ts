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

export function useContratacao() {
    const [step, setStep] = useState(2);
    const [hasLogin, setHasLogin] = useState(false);
    const [loginError, setLoginError] = useState('');
    const breadCrumbItems = [
        'Detalhes da diária',
        'Identificação',
        'Pagamento',
    ];
    const servicos: ServicoInterface[] = [
        {
            id: 5,
            nome: 'Limpeza comum',
            icone: 'twf-cleaning-1',
            horas_banheiro: 1,
            horas_cozinha: 1,
            horas_quarto: 1,
            horas_quintal: 1,
            horas_sala: 1,
            horas_outros: 0,
            qtd_horas: 5,
            valor_minimo: 50,
            valor_banheiro: 20,
            valor_cozinha: 20,
            valor_quarto: 20,
            valor_quintal: 20,
            valor_sala: 20,
            valor_outros: 20,
            porcentagem_comissao: 10,
        },
    ];

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
