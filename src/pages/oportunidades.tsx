import React from 'react';
import { GetStaticProps } from 'next';
import { useOportunidadesPage } from 'data/hooks/pages/useOportunidades.page';
import {
    Box,
    Button,
    Container,
    Divider,
    Snackbar,
    Typography,
} from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, {
    TablePagination,
    TableRow,
    TableCell,
} from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { TextFormatService } from 'data/services/TextFormatService';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};

const Oportunidades: React.FC = () => {
    const {
        isMobile,
        oportunidades,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        oportunidadeSelecionada,
        setOportunidadeselecionada,
        totalPages,
        seCandidatar,
        menssagemSnackbar,
        setMessagemSnackbar,
        totalComodos,
        podeCandidatar,
    } = useOportunidadesPage();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title="Oportunidades de trabalho" />
                {oportunidades.length > 0 ? (
                    isMobile ? (
                        <>
                            {oportunidades.map((item) => (
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
                                            <br />
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                    body={
                                        <>
                                            Cidade: {item.cidade}
                                            <br />
                                            Número de comodos:{' '}
                                            {totalComodos(item)}
                                        </>
                                    }
                                    actions={
                                        <>
                                            {podeCandidatar(item) && (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        setOportunidadeselecionada(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Se candidatar
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
                                    'Tipo de serviço',
                                    'Número de comodos',
                                    'Cidade',
                                    'Valor',
                                    '',
                                ]}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                data={oportunidades}
                                rowElement={(data) => (
                                    <TableRow>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    data.data_atendimento as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            {data.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {totalComodos(data)} cômodos
                                        </TableCell>
                                        <TableCell>{data.cidade}</TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                data.preco
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeCandidatar(data) && (
                                                <Button
                                                    onClick={() =>
                                                        setOportunidadeselecionada(
                                                            data
                                                        )
                                                    }
                                                >
                                                    Se candidatar
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
                    <Typography align="center">
                        Nenhuma oportunidade ainda
                    </Typography>
                )}
            </Container>
            {oportunidadeSelecionada && (
                <Dialog
                    isOpen={oportunidadeSelecionada !== undefined}
                    title="Se candidatar à  diária"
                    subtitle="Tem certeza que deseja se candidatar à diária abaixo?"
                    onClose={() => setOportunidadeselecionada(undefined)}
                    onConfirm={() => seCandidatar(oportunidadeSelecionada)}
                >
                    <Box>
                        <JobInformation>
                            <>
                                <div>
                                    Data:{' '}
                                    <strong>
                                        {TextFormatService.dateTime(
                                            oportunidadeSelecionada.data_atendimento as string
                                        )}
                                    </strong>
                                </div>
                                <div>
                                    {TextFormatService.getAdress(
                                        oportunidadeSelecionada as EnderecoInterface
                                    )}
                                </div>
                                <div>
                                    <strong>
                                        Valor:{' '}
                                        {TextFormatService.currency(
                                            oportunidadeSelecionada?.preco
                                        )}
                                    </strong>
                                </div>
                            </>
                        </JobInformation>
                    </Box>
                    <UserInformation
                        name={
                            oportunidadeSelecionada.cliente.nome_completo || ''
                        }
                        rating={oportunidadeSelecionada.cliente.reputacao || 0}
                        picture={
                            oportunidadeSelecionada.cliente.foto_usuario || ''
                        }
                    />
                    <Divider />
                    {oportunidadeSelecionada?.avaliacoes_clientes?.length >
                        0 && (
                        <>
                            <Typography
                                sx={{
                                    p: 3,
                                    fontWeight: 'medium',
                                    bgColor: 'grey.50',
                                }}
                            >
                                Últimas avaliações do cliente
                            </Typography>
                            {oportunidadeSelecionada?.avaliacoes_clientes.map(
                                (item, index) => (
                                    <UserInformation
                                        key={index}
                                        name={item.nome_avaliador}
                                        rating={item.nota}
                                        picture={item.foto_avaliador}
                                        description={item.descricao}
                                        isRating={true}
                                    />
                                )
                            )}
                        </>
                    )}

                    <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ py: 2 }}
                    >
                        Ao se candidatar, você não é o(a) diarista escolhido(a)
                        para realizar o trabalho. Vamos analisar suas
                        qualificações e d a distância para o local da diária.
                        Caso você seja a pessoa selecionada, receberá um email
                        avisando. Atente-se à sua caixa de entrada!
                    </Typography>
                </Dialog>
            )}
            <Snackbar
                open={menssagemSnackbar.length > 0}
                message={menssagemSnackbar}
                autoHideDuration={4000}
                onClose={() => setMessagemSnackbar('')}
            />
        </>
    );
};

export default Oportunidades;
