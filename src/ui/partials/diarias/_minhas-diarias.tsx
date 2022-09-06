import { Button, Container, Typography } from '@mui/material';
import { DiariaInterface, DiariaStatus } from 'data/@types/DiariaInterface';
import { useMinhasDiarias } from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import DataList from 'ui/components/data-display/DataList/DataList';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import Table, {
    TableCell,
    TablePagination,
    TableRow,
} from 'ui/components/data-display/Table/Table';
import Link from 'ui/components/navigation/Link/Link';
import {
    CancelDialog,
    ConfirmDialog,
    RatingDialog,
} from './_minhas-diarias-dialogs';

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC = () => {
    const {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        podeVisualizar,
        podeConfirmar,
        diariaConfirmar,
        setDiariaConfirmar,
        confirmarDiarista,
        podeAvaliar,
        diariaAvaliar,
        setDiariaAvaliar,
        avaliarDiaria,
        diariaCancelar,
        setDiariaCancelar,
        podeCancelar,
        cancelarDiaria,
    } = useMinhasDiarias();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title="Minhas diárias" />
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
                                                item.data_atendimento as string
                                            )}
                                            <br />
                                            {item.nome_servico}
                                        </>
                                    }
                                    body={
                                        <>
                                            Status:{' '}
                                            {
                                                DiariaService.getStatus(
                                                    item.status as DiariaStatus
                                                ).label
                                            }
                                            <br />
                                            Valor:{' '}
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                    actions={
                                        <>
                                            {podeVisualizar(item) && (
                                                <Button
                                                    component={Link}
                                                    href={`?id=${item.id}`}
                                                    color="inherit"
                                                    variant="outlined"
                                                >
                                                    Detalhes
                                                </Button>
                                            )}
                                            {podeConfirmar(item) && (
                                                <Button
                                                    color="success"
                                                    variant="contained"
                                                    onClick={() =>
                                                        setDiariaConfirmar(item)
                                                    }
                                                >
                                                    Confirmar presença
                                                </Button>
                                            )}
                                            {podeCancelar(item) && (
                                                <Button
                                                    color="error"
                                                    variant="contained"
                                                    onClick={() =>
                                                        setDiariaCancelar(item)
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                            {podeAvaliar(item) && (
                                                <Button
                                                    color="success"
                                                    variant="contained"
                                                    onClick={() =>
                                                        setDiariaAvaliar(item)
                                                    }
                                                >
                                                    Avaliar
                                                </Button>
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
                                    'Tipo de serviço',
                                    'Valor',
                                    '',
                                    '',
                                ]}
                                data={filteredData}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                rowElement={(item, _index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.data_atendimento as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <Status
                                                color={
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).color
                                                }
                                            >
                                                {
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).label
                                                }
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {item.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeVisualizar(item) && (
                                                <Link href={`?id=${item.id}`}>
                                                    Detalhes
                                                </Link>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeConfirmar(item) && (
                                                <Button
                                                    color="success"
                                                    onClick={() =>
                                                        setDiariaConfirmar(item)
                                                    }
                                                >
                                                    Confirmar presença
                                                </Button>
                                            )}
                                            {podeAvaliar(item) && (
                                                <Button
                                                    color="success"
                                                    onClick={() =>
                                                        setDiariaAvaliar(item)
                                                    }
                                                >
                                                    Avaliar
                                                </Button>
                                            )}
                                            {podeCancelar(item) && (
                                                <Button
                                                    color="error"
                                                    onClick={() =>
                                                        setDiariaCancelar(item)
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
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
                    <Typography align="center">Nenhuma diária ainda</Typography>
                )}
            </Container>

            {diariaConfirmar.id && (
                <ConfirmDialog
                    diaria={diariaConfirmar}
                    onCancel={() => setDiariaConfirmar({} as DiariaInterface)}
                    onConfirm={confirmarDiarista}
                />
            )}

            {diariaAvaliar.id && (
                <RatingDialog
                    diaria={diariaAvaliar}
                    onCancel={() => setDiariaAvaliar({} as DiariaInterface)}
                    onConfirm={avaliarDiaria}
                />
            )}

            {diariaCancelar.id && (
                <CancelDialog
                    diaria={diariaCancelar}
                    onCancel={() => setDiariaCancelar({} as DiariaInterface)}
                    onConfirm={cancelarDiaria}
                />
            )}
        </>
    );
};

export default MinhasDiarias;
