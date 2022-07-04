import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';
import UserHeaderMenu from './UserHeaderMenu';

export default {
    title: 'navigation/UserHeaderMenu',
    component: UserHeaderMenu,
} as ComponentMeta<typeof UserHeaderMenu>;

const Template: ComponentStory<typeof UserHeaderMenu> = (args) => (
    <UserHeaderMenu {...args} />
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
    isMenuOpen: false,
};
