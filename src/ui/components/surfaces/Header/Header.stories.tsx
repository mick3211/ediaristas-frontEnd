import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './Header';
import { UserInterface } from 'data/@types/UserInterface';

export default {
    title: 'Surfaces/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
    <Header user={{} as UserInterface} />
);

export const Default = Template.bind({});

Default.args = {};
