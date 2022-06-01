import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DataList from './DataList';

export default {
    title: 'data-display/DataList',
    component: DataList,
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = (args) => (
    <DataList
        header={
            <div>
                Data: 45/21/5621
                <br />
                Limpeza simples
            </div>
        }
        body={
            <div>
                Cidade: Maceió
                <br />
                Número de cômodos
            </div>
        }
        actions={
            <Button variant="contained" color="secondary">
                Se candidatar
            </Button>
        }
    />
);

export const Default = Template.bind({});

Default.args = {};
