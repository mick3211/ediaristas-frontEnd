import { UserContext } from 'data/contexts/UserContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import { FinancialData } from '../UserForm.styled';

export const FinancialForm = () => {
    const { register } = useFormContext();

    const { user } = useContext(UserContext).userState;

    return (
        <FinancialData>
            <TextField
                label="Chave pix"
                defaultValue={user.chave_pix}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
