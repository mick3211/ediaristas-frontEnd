import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { DiariaStatus } from 'data/@types/DiariaInterface';
import { useDetalhesDiaria } from 'data/hooks/pages/diarias/useDetalhesDiaria.page';
import { DateService } from 'data/services/DateService';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import {
    CardsContainer,
    JobDetails,
    JobTitle,
    UserCard,
    UserTitle,
} from './_detalhes-diaria.styled';

// import { Component } from './_detalhes-diaria.styled';

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
    const { cliente, diaria, diarista } = useDetalhesDiaria(id);

    if (!diaria.id) {
        return (
            <Container sx={{ textAlign: 'center', my: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
            <CardsContainer>
                <JobDetails>
                    <JobTitle>Detalhes da Diária</JobTitle>
                    <Box sx={{ mb: 2 }}>
                        Status:{' '}
                        <Status
                            color={
                                DiariaService.getStatus(
                                    diaria.status as DiariaStatus
                                ).color
                            }
                        >
                            {
                                DiariaService.getStatus(
                                    diaria.status as DiariaStatus
                                ).label
                            }
                        </Status>
                    </Box>
                    <div>
                        Data:{' '}
                        <strong>
                            {TextFormatService.reverseDate(
                                diaria.data_atendimento as string
                            )}
                        </strong>
                        <br />
                        Horário:{' '}
                        <strong>
                            {DateService.getTimeFromDate(
                                diaria.data_atendimento as string
                            )}
                        </strong>
                        <br />
                        Endereço:{' '}
                        <strong>{TextFormatService.getAdress(diaria)}</strong>
                    </div>
                </JobDetails>
                <UserCard>
                    <UserTitle>Diarista</UserTitle>
                    {diarista.id ? (
                        <>
                            <UserInformation
                                sx={{ bgcolor: 'inherit', px: 0 }}
                                picture={diarista.foto_usuario || ''}
                                name={diarista.nome_completo || ''}
                                rating={diarista.reputacao || 1}
                            />
                            <Typography>
                                Telefone:{' '}
                                {TextFormatService.formatPhoneNumber(
                                    diarista.telefone || ''
                                )}
                            </Typography>
                        </>
                    ) : (
                        <Typography>
                            Diarista ainda não selecionado(a)
                        </Typography>
                    )}
                </UserCard>

                <UserCard>
                    <UserTitle>Cliente</UserTitle>
                    <UserInformation
                        sx={{ bgcolor: 'inherit', px: 0 }}
                        picture={cliente.foto_usuario || ''}
                        name={cliente.nome_completo || ''}
                        rating={cliente.reputacao || 1}
                    />
                    <Typography>
                        Telefone:{' '}
                        {TextFormatService.formatPhoneNumber(
                            cliente.telefone || ''
                        )}
                    </Typography>
                </UserCard>
            </CardsContainer>
        </Container>
    );
};

export default DetalhesDiaria;
