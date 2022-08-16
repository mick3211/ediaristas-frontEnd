import { Autocomplete, CircularProgress, Typography } from '@mui/material';
import { CidadeInterface } from 'data/@types/EnderecoInterface';
import { useCitiesForm } from 'data/hooks/components/inputs/UserForm/forms/useCitiesForm';
import ChipField from 'ui/components/data-display/ChipField/ChipField';
import TextField from '../../TextField/TextField';
import { CitiesSelection } from '../UserForm.styled';

export const CitiesForm: React.FC<{ estado: string }> = ({ estado }) => {
    const { citiesList, citiesName, handleDelete, handleNewCity, options } =
        useCitiesForm(estado);

    return (
        <CitiesSelection>
            <Autocomplete
                defaultValue={{ cidade: '' } as CidadeInterface}
                onChange={(_ev, newValue) =>
                    newValue && handleNewCity(newValue.cidade)
                }
                disablePortal
                options={options}
                getOptionLabel={(option) => option.cidade}
                loading={citiesList.length === 0}
                loadingText="Carregando cidades..."
                sx={{ gridArea: 'busca-cidade' }}
                noOptionsText={'Nenhuma cidade com esse nome'}
                renderInput={({ InputProps, ...params }) => (
                    <TextField
                        label="Busque pelo nome da cidade"
                        InputProps={{
                            ...InputProps,
                            endAdornment: (
                                <>
                                    {citiesList.length ? (
                                        <i className="twf-search" />
                                    ) : (
                                        <CircularProgress
                                            size={20}
                                            color={'inherit'}
                                        />
                                    )}
                                    {InputProps.endAdornment}
                                </>
                            ),
                        }}
                        required={false}
                        {...params}
                    />
                )}
            />
            <Typography>Cidades selecionadas</Typography>
            <ChipField
                itemsList={citiesName}
                onDelete={handleDelete}
                emptyMessage="Nenhuma cidade selecionada ainda"
            />
        </CitiesSelection>
    );
};
