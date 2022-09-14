import { UserContext } from 'data/contexts/UserContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import PasswordStrength from 'ui/components/feedback/PasswordStrength/PasswordStrength';
import TextField from '../../TextField/TextField';
import { ContactData } from '../UserForm.styled';

export const ContactForm = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const newPassword = watch('usuario.new_password');

    const { user } = useContext(UserContext).userState;

    return (
        <ContactData>
            <TextField
                label="E-mail"
                defaultValue={user.email}
                style={{ gridArea: 'email' }}
                {...register('usuario.email')}
                helperText={errors?.usuario?.email?.message}
                error={errors?.usuario?.email !== undefined}
            />
            <TextField
                label="Senha antiga"
                type="password"
                style={{ gridArea: 'senha-antiga' }}
                {...register('usuario.password')}
                helperText={errors?.usuario?.password?.message}
                error={errors?.usuario?.password !== undefined}
                required={false}
            />
            <TextField
                label="Nova senha"
                type="password"
                style={{ gridArea: 'nova-senha' }}
                {...register('usuario.new_password')}
                helperText={errors?.usuario?.new_password?.message}
                error={errors?.usuario?.new_password !== undefined}
                required={false}
            />
            <TextField
                label="confirme a nova senha"
                type="password"
                style={{ gridArea: 'confirmar-senha' }}
                {...register('usuario.password_confirmation')}
                helperText={errors?.usuario?.password_confirmation?.message}
                error={errors?.usuario?.password_confirmation !== undefined}
                required={false}
            />
            <PasswordStrength password={newPassword || ''} />
        </ContactData>
    );
};
