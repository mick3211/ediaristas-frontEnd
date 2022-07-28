import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Table, { TableCell, TablePagination, TableRow } from './Table';

export default {
    title: 'data-display/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

interface TemplatePropsInterface {
    data: string;
    tipo: string;
    comodos: number;
    cidade: string;
}

const Template: ComponentStory<typeof Table> = (args) => (
    <>
        <Table {...args} />
        <TablePagination count={10} />
    </>
);

export const Default = Template.bind({});

Default.args = {
    header: ['Data', 'Tipo de serviço', 'Número de cômodos', 'Cidade', ''],
    data: [
        {
            data: '05/05/2022',
            tipo: 'Limpeza de rotina',
            comodos: 4,
            cidade: 'Maceió - AL',
        },
        {
            data: '05/02/2022',
            tipo: 'Limpeza Pesada',
            comodos: 2,
            cidade: 'Maceió - AL',
        },
        {
            data: '05/09/2022',
            tipo: 'Limpeza de rotina',
            comodos: 3,
            cidade: 'Maceió - AL',
        },
    ],
    rowElement(_item, index) {
        const item = _item as TemplatePropsInterface;
        return (
            <TableRow key={index}>
                <TableCell>
                    <strong>{item.data}</strong>
                </TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.comodos} cômodos</TableCell>
                <TableCell>{item.cidade}</TableCell>
                <TableCell align="right">
                    <Button>Visualizar</Button>
                </TableCell>
            </TableRow>
        );
    },
};
