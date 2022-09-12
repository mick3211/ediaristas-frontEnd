import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { usePagamentos } from 'data/hooks/pages/usePagamentos.page';
import { Container, Button, Typography } from '@mui/material';
import { ButtonsContainer } from '@partials/diarias/_minhas-diarias.styled';
import { TextFormatService } from 'data/services/TextFormatService';
import DataList from 'ui/components/data-display/DataList/DataList';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import { PaymentService } from 'data/services/PaymentService';
import Table, {
    TableCell,
    TablePagination,
    TableRow,
} from 'ui/components/data-display/Table/Table';

// import { Component } from '@styles/pages/pagamentos.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Pagamentos',
        },
    };
};

const Pagamentos: NextPage = () => {
    const {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        filtro,
        alterarFiltro,
    } = usePagamentos();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title="Pagamentos" />
                <ButtonsContainer>
                    <Button
                        variant={filtro === 'pago' ? 'contained' : 'outlined'}
                        onClick={() => alterarFiltro('pago')}
                    >
                        Pago
                    </Button>
                    <Button
                        variant={
                            filtro === 'aguardando' ? 'contained' : 'outlined'
                        }
                        onClick={() => alterarFiltro('aguardando')}
                    >
                        Aguardando transferência
                    </Button>
                </ButtonsContainer>
                {filteredData.length > 0 ? (
                    isMobile ? (
                        <>
                            {filteredData.map((item) => (
                                <DataList
                                    key={item.id}
                                    header={
                                        <>
                                            Data:{' '}
                                            {TextFormatService.reverseDate(
                                                item.created_at
                                            )}
                                        </>
                                    }
                                    body={
                                        <>
                                            Status:{' '}
                                            {
                                                PaymentService.getStatus(
                                                    item.status
                                                ).label
                                            }
                                            <br />
                                            Valor diária:{' '}
                                            {TextFormatService.currency(
                                                item.valor
                                            )}
                                            <br />
                                            Valor depositado:{' '}
                                            {TextFormatService.currency(
                                                item.valor_deposito
                                            )}
                                        </>
                                    }
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <Table
                                header={[
                                    'Data',
                                    'Status',
                                    'Valor da Diária',
                                    'Valor Depositado',
                                ]}
                                data={filteredData}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                rowElement={(item, _index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.created_at
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <Status
                                                color={
                                                    PaymentService.getStatus(
                                                        item.status
                                                    ).color
                                                }
                                            >
                                                {
                                                    PaymentService.getStatus(
                                                        item.status
                                                    ).label
                                                }
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.valor
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.valor_deposito
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                            <TablePagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_ev, nextPage) =>
                                    setCurrentPage(nextPage)
                                }
                            />
                        </>
                    )
                ) : (
                    <Typography align="center">
                        Nenhum pagamento ainda
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default Pagamentos;
