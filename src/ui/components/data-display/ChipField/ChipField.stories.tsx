import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChipField from './ChipField';

export default {
    title: 'data-display/ChipField',
    component: ChipField,
} as ComponentMeta<typeof ChipField>;

const Template: ComponentStory<typeof ChipField> = (args) => (
    <ChipField {...args} />
);

export const Default = Template.bind({});

Default.args = {
    itemsList: ['São Paulo - SP', 'Salvador - BA', 'Aracajú - SE'],
    emptyMessage: 'Nenhuma cidade selecionada ainda',
};
