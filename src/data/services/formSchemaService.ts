import * as yup from 'yup';
import { DateService } from './DateService';
import { PaymentService } from './PaymentService';
import { ValidationService } from './ValidationService';

export const FormSchemaService = {
    newContact() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    email: yup.string().email('E-mail inválido'),
                    password: yup.string().min(8, 'Senha muito curta'),
                    password_confirmation: yup
                        .string()
                        .min(8, 'Senha muito curta')
                        .oneOf(
                            [yup.ref('password'), null],
                            'As senhas devem ser iguais'
                        ),
                }),
            })
            .defined();
    },
    payment() {
        return yup
            .object()
            .shape({
                pagamento: yup.object().shape({
                    numero_cartao: yup.string().test(
                        'card_number',
                        'Número do cartão inválido',
                        (value) =>
                            PaymentService.validate({
                                card_number: value as string,
                                card_cvv: '',
                                card_expiration_date: '',
                                card_holder_name: '',
                            }).card_number
                    ),
                    nome_cartao: yup.string(),
                    validade: yup.string().test(
                        'card_expiration_date',
                        'Data de validade inválida',
                        (value) =>
                            PaymentService.validate({
                                card_number: '',
                                card_cvv: '',
                                card_expiration_date: value as string,
                                card_holder_name: '',
                            }).card_expiration_date
                    ),
                    codigo: yup.string().test(
                        'card_cvv',
                        'Código de validação inválido',
                        (value) =>
                            PaymentService.validate({
                                card_number: '',
                                card_cvv: value as string,
                                card_expiration_date: '',
                                card_holder_name: '',
                            }).card_cvv
                    ),
                }),
            })
            .defined();
    },
    userData() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    nome_completo: yup
                        .string()
                        .min(3, 'Digite seu nome completo'),
                    nascimento: yup
                        .date()
                        .transform(DateService.transformDate)
                        .min(
                            DateService.maxAdultBirthday(),
                            'Insira uma data válida'
                        )
                        .max(
                            DateService.minAdultBirthday(),
                            'Você deve ser maior de 18 anos'
                        )
                        .typeError('Insira uma data válida'),
                    cpf: yup
                        .string()
                        .test(
                            'cpf',
                            'Insira um CPF válido',
                            ValidationService.cpf
                        ),
                    telefone: yup
                        .string()
                        .test(
                            'telefone',
                            'Insira telefone inválido',
                            ValidationService.telefone
                        ),
                }),
            })
            .defined();
    },
    address() {
        return yup
            .object()
            .shape({
                endereco: yup.object().shape({
                    cep: yup
                        .string()
                        .test('cep', 'CEP inválido', (value) =>
                            ValidationService.cep(value)
                        ),
                    estado: yup.string(),
                    cidade: yup.string(),
                    bairro: yup.string(),
                    logradouro: yup.string(),
                    numero: yup.string(),
                    complemento: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired(),
                }),
            })
            .defined();
    },
};
