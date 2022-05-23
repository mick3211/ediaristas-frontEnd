import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserInformation from './UserInformation';

export default {
    title: 'data-display/UserInformation',
    component: UserInformation,
} as ComponentMeta<typeof UserInformation>;

const Template: ComponentStory<typeof UserInformation> = args => (
    <UserInformation {...args} />
);

export const Default = Template.bind({});

Default.args = {
    name: 'Mickael Rodrigues Felizardo',
    picture: 'https://github.com/mick3211.png',
    rating: 4,
    isRating: true,
    description: 'Maceió - AL',
};
