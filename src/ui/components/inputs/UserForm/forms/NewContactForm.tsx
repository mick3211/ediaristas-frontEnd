import { useFormContext } from 'react-hook-form';
import PasswordStrength from 'ui/components/feedback/PasswordStrength/PasswordStrength';
import TextField from '../../TextField/TextField';
import { NewContactData } from '../UserForm.styled';

export const NewContactForm = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const newPassword = watch('usuario.password');

    return (
        <NewContactData>
            <TextField
                label="E-mail"
                style={{ gridArea: 'email' }}
                {...register('usuario.email')}
                helperText={errors?.usuario?.email?.message}
                error={errors?.usuario?.email !== undefined}
            />
            <TextField
                label="Senha"
                type="password"
                style={{ gridArea: 'senha' }}
                {...register('usuario.password')}
                helperText={errors?.usuario?.password?.message}
                error={errors?.usuario?.password !== undefined}
            />
            <TextField
                label="confirme a senha"
                type="password"
                style={{ gridArea: 'confirmar-senha' }}
                {...register('usuario.password_confirmation')}
                helperText={errors?.usuario?.password_confirmation?.message}
                error={errors?.usuario?.password_confirmation !== undefined}
            />
            <PasswordStrength password={newPassword || ''} />
        </NewContactData>
    );
};
