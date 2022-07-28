import React, { useMemo } from 'react';
// import { } from '@mui/material';
import {
    TableBodyStyled,
    TableCellStyled,
    TableContainerStyled,
    TableHeadStyled,
    TablePaginationStyled,
    TablePaper,
    TableRowStyled,
    TableStyled,
} from './Table.styled';

export interface TableProps<T> {
    header: string[];
    data: T[];
    rowElement: (item: T, index: number) => React.ReactNode;
    itemsPerPage?: number;
    currentPage?: number;
}

export type TableComponentType = <T>(
    props: TableProps<T>
) => React.ReactElement;

const Table: TableComponentType = ({
    itemsPerPage,
    currentPage,
    data,
    ...props
}) => {
    const tableData = useMemo<typeof data>(() => {
        if (itemsPerPage != undefined && currentPage != undefined) {
            return data.slice(
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage
            );
        }
        return data;
    }, [itemsPerPage, currentPage, data]);

    return (
        <TablePaper>
            <TableContainerStyled>
                <TableStyled>
                    <TableHeadStyled>
                        <TableRowStyled>
                            {props.header.map((item, index) => (
                                <TableCellStyled key={index}>
                                    {item}
                                </TableCellStyled>
                            ))}
                        </TableRowStyled>
                    </TableHeadStyled>
                    <TableBodyStyled>
                        {tableData.map(props.rowElement)}
                    </TableBodyStyled>
                </TableStyled>
            </TableContainerStyled>
        </TablePaper>
    );
};

export default Table;
export const TableRow = TableRowStyled;
export const TableCell = TableCellStyled;
export const TablePagination = TablePaginationStyled;
