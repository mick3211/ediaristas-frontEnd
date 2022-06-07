import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { PaymentData } from '../UserForm.styled';

export const PaymentForm = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();

    useEffect(() => {
        register('pagamento_recusado');
    }, []);

    return (
        <PaymentData>
            <Controller
                name="pagamento.numero_do_cartao"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextFieldMask
                        {...props}
                        mask="999 999 999 999"
                        label="Número do cartão"
                        style={{ gridArea: 'numero' }}
                        error={
                            errors?.pagamento?.numero_do_cartao !== undefined
                        }
                        helperText={
                            errors?.pagamento?.numero_do_cartao?.message
                        }
                    />
                )}
            />

            <TextField
                defaultValue={''}
                label="Nome impresso no cartão"
                style={{ gridArea: 'nome' }}
                {...register('pagamento.nome_cartao')}
                error={errors?.pagamento?.nome_cartao !== undefined}
                helperText={errors?.pagamento?.nome_cartao?.message}
            />

            <Controller
                name="pagamento.pagamento_validade"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextFieldMask
                        {...props}
                        mask="99/99"
                        label="Validade"
                        style={{ gridArea: 'validade' }}
                        error={
                            errors?.pagamento?.pagamento_validade !== undefined
                        }
                        helperText={
                            errors?.pagamento?.pagamento_validade?.message
                        }
                    />
                )}
            />
            <Controller
                name="pagamento.codigo"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextFieldMask
                        {...props}
                        mask="999"
                        label="CVV"
                        style={{ gridArea: 'codigo' }}
                        error={errors?.pagamento?.codigo !== undefined}
                        helperText={errors?.pagamento?.codigo?.message}
                    />
                )}
            />

            {errors?.pagamento_recusado !== undefined && (
                <Typography
                    color="error"
                    sx={{ gridArea: 'erro', textAlign: 'center' }}
                >
                    {errors.pagamento_recusado.message}
                </Typography>
            )}
        </PaymentData>
    );
};
