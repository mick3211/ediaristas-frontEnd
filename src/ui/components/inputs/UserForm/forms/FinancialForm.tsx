import { useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import { FinancialData } from '../UserForm.styled';

export const FinancialForm = () => {
    const { register } = useFormContext();

    return (
        <FinancialData>
            <TextField
                label="Chave pix"
                defaultValue={''}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
