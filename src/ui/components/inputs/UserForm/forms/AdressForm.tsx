import { Autocomplete, MenuItem } from '@mui/material';
import { useAddressForm } from 'data/hooks/components/inputs/UserForm/forms/useAddressForm';
import { Controller } from 'react-hook-form';
import Select from '../../Select/Select';
import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { AdressData } from '../UserForm.styled';

export const AdressForm = () => {
    const { control, errors, estados, opcoesCidades, addressState, register } =
        useAddressForm();

    return (
        <AdressData>
            <Controller
                name="endereco.cep"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextFieldMask
                        {...props}
                        mask="99999-999"
                        label="CEP"
                        style={{ gridArea: 'cep' }}
                        error={errors?.endereco?.cep !== undefined}
                        helperText={errors?.endereco?.cep?.message}
                    />
                )}
            />
            <Controller
                name="endereco.estado"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <Select
                        {...props}
                        label="Estado"
                        style={{ gridArea: 'estado' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {estados.map((estado) => (
                            <MenuItem key={estado.sigla} value={estado.sigla}>
                                {estado.nome}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            <Controller
                name="endereco.cidade"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <Autocomplete
                        {...props}
                        onChange={(event, newValue) => props.onChange(newValue)}
                        style={{ gridArea: 'cidade' }}
                        disablePortal
                        options={opcoesCidades}
                        loading={opcoesCidades.length === 0}
                        loadingText="Carregando..."
                        disabled={addressState === 0}
                        noOptionsText="Nenhuma cidade com esse nome"
                        renderInput={(params) => (
                            <TextField label="Cidade" {...params} />
                        )}
                    />
                )}
            />
            <Controller
                name="endereco.bairro"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextField
                        {...props}
                        label="Bairro"
                        style={{ gridArea: 'bairro' }}
                        error={errors?.endereco?.bairro !== undefined}
                        helperText={errors?.endereco?.bairro?.message}
                    />
                )}
            />
            <Controller
                name="endereco.logradouro"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextField
                        {...props}
                        label="Logradouro"
                        style={{ gridArea: 'logradouro' }}
                        error={errors?.endereco?.logradouro !== undefined}
                        helperText={errors?.endereco?.logradouro?.message}
                    />
                )}
            />
            <Controller
                name="endereco.bairro"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextField
                        {...props}
                        label="Bairro"
                        style={{ gridArea: 'bairro' }}
                        error={errors?.endereco?.bairro !== undefined}
                        helperText={errors?.endereco?.bairro?.message}
                    />
                )}
            />
            <Controller
                name="endereco.numero"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextField
                        {...props}
                        label="Número"
                        style={{ gridArea: 'numero' }}
                        error={errors?.endereco?.numero !== undefined}
                        helperText={errors?.endereco?.numero?.message}
                    />
                )}
            />
            <Controller
                name="endereco.complemento"
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...props } }) => (
                    <TextField
                        {...props}
                        label="Complemento"
                        required={false}
                        style={{ gridArea: 'complemento' }}
                        error={errors?.endereco?.complemento !== undefined}
                        helperText={errors?.endereco?.complemento?.message}
                    />
                )}
            />
        </AdressData>
    );
};
