import { Divider, Typography, Tooltip, Button, Container } from '@mui/material';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ItemCounter from 'ui/components/inputs/ItemCounter/ItemCounter';
import TextField from 'ui/components/inputs/TextField/TextField';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';
import ToggleButtonGroup, {
    ToggleButton,
} from 'ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup';
import { AddressForm } from 'ui/components/inputs/UserForm/UserForm';
import { ItemsContainer } from './_detalhes-servico.styled';

interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
    podemosAtender?: boolean;
    comodos?: number;
}

export const houseParts = [
    {
        singular: 'Cozinha',
        plural: 'Cozinhas',
        name: 'quantidade_cozinhas',
    },
    {
        singular: 'Sala',
        plural: 'Salas',
        name: 'quantidade_salas',
    },
    {
        singular: 'Banheiro',
        plural: 'Banheiros',
        name: 'quantidade_banheiros',
    },
    {
        singular: 'Quarto',
        plural: 'Quartos',
        name: 'quantidade_quartos',
    },
    {
        singular: 'Quintal',
        plural: 'Quintais',
        name: 'quantidade_quintais',
    },
    {
        singular: 'Outro',
        plural: 'Outros',
        name: 'quantidade_outros',
    },
];

const DetalhesServico: React.FC<DetalhesServicoProps> = ({
    servicos = [],
    comodos = 0,
    podemosAtender,
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual tipo de limpeza você precisa?
            </Typography>
            <Controller
                name="faxina.servico"
                defaultValue={servicos[0].id}
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        value={field.value}
                        exclusive
                        onChange={(_event, value) =>
                            field.onChange(value || servicos[0].id)
                        }
                    >
                        {servicos.map((servico) => (
                            <ToggleButton value={servico.id} key={servico.id}>
                                <i
                                    className={
                                        servico.icone || 'twf-cleaning-1'
                                    }
                                />{' '}
                                {servico.nome}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            />

            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Qual o tamanho da sua casa?
            </Typography>

            <ItemsContainer>
                {houseParts.map((item) => (
                    <Controller
                        key={item.name}
                        name={'faxina.' + item.name}
                        defaultValue={0}
                        control={control}
                        render={({ field }) => (
                            <ItemCounter
                                label={item.singular}
                                plural={item.plural}
                                counter={field.value}
                                onInc={() => field.onChange(field.value + 1)}
                                onDec={() =>
                                    field.onChange(Math.max(0, field.value - 1))
                                }
                            />
                        )}
                    />
                ))}
            </ItemsContainer>

            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Em qual data você gostaria de receber o(a) diarista?
            </Typography>
            <ItemsContainer>
                <Controller
                    name={'faxina.data_atendimento'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...props } }) => (
                        <TextFieldMask
                            {...props}
                            inputRef={ref}
                            mask="99/99/9999"
                            label="Data"
                            error={
                                errors?.faxina?.data_atendimento !== undefined
                            }
                            helperText={
                                errors?.faxina?.data_atendimento.message
                            }
                        />
                    )}
                />
                <Controller
                    name={'faxina.hora_inicio'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...props } }) => (
                        <TextFieldMask
                            {...props}
                            inputRef={ref}
                            mask="99:99"
                            label="Hora de início"
                            error={errors?.faxina?.hora_inicio !== undefined}
                            helperText={errors?.faxina?.hora_inicio.message}
                        />
                    )}
                />
                <Controller
                    name={'faxina.hora_termino'}
                    defaultValue={''}
                    control={control}
                    render={({ field: { ref, ...props } }) => (
                        <Tooltip title="Campo automático">
                            <div>
                                <TextFieldMask
                                    {...props}
                                    fullWidth
                                    inputRef={ref}
                                    mask="99:99"
                                    inputProps={{
                                        readOnly: true,
                                        disabled: true,
                                    }}
                                    label="Hora de término"
                                    error={
                                        errors?.faxina?.hora_termino !==
                                        undefined
                                    }
                                    helperText={
                                        errors?.faxina?.hora_termino.message
                                    }
                                />
                            </div>
                        </Tooltip>
                    )}
                />
            </ItemsContainer>

            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Observações
            </Typography>
            <TextField
                label="Quer acrescentar algum detalhe?"
                {...register('faxina.observacoes')}
                required={false}
                fullWidth
                multiline
            />

            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Em qual endereço será realizada a limpeza?
            </Typography>
            <AddressForm />
            {!podemosAtender && (
                <Typography color={'error'} sx={{ pb: 2 }} align="center">
                    Infelizmente ainda não atendemos a sua região
                </Typography>
            )}

            <Container sx={{ textAlign: 'right' }}>
                <Button
                    type="submit"
                    disabled={comodos === 0 || !podemosAtender}
                    variant="contained"
                    color="secondary"
                >
                    Ir para indentificação
                </Button>
            </Container>
        </>
    );
};

export default DetalhesServico;
