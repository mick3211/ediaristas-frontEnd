import { ComponentMeta, ComponentStory } from '@storybook/react';
import JobInformation from './JobInformation';

export default {
    title: 'data-display/JobInformation',
    component: JobInformation,
} as ComponentMeta<typeof JobInformation>;

const Template: ComponentStory<typeof JobInformation> = (args) => (
    <JobInformation {...args} />
);

export const Default = Template.bind({});

Default.args = {
    children: (
        <div>
            <div>
                Data: <strong>03/05/2022 às 8 horas</strong>
            </div>
            <div>asd asmdlksad lkasdsklandlska</div>
            <div>
                <strong>valor: 45465</strong>
            </div>
        </div>
    ),
};
