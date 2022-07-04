import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';
import UserProfileAvatar from './UserProfileAvatar';

export default {
    title: 'data-display/UserProfileAvatar',
    component: UserProfileAvatar,
} as ComponentMeta<typeof UserProfileAvatar>;

const Template: ComponentStory<typeof UserProfileAvatar> = (args) => (
    <UserProfileAvatar {...args} />
);

export const Default = Template.bind({});

Default.args = {
    user: {
        nome_completo: 'Mickael Felizardo',
        nascimento: '2000-11-08',
        cpf: '12345678910',
        email: 'mail@mail.com',
        foto_usuario: 'https://github.com/mick3211.png',
        telefone: '(12) 12345-6789',
        tipo_usuario: UserType.Cliente,
        reputacao: 4,
        password: '',
        chave_pix: '',
        links: [],
    },
};
