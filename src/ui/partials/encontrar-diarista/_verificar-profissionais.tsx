import { Button, Container, Typography, CircularProgress } from '@mui/material';
import useVerificarProfissionais from 'data/hooks/pages/useVerificarProfissionais.page';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';

import {
    FormElementContainer,
    ProfissionaisPaper,
    ProfissionaisContainer,
} from './_verificar-profissionais.styled';

const VerificarProfissionais: React.FC = () => {
    const {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        error,
        diaristas,
        buscaFeita,
        isLoading,
        diaristasRestantes,
    } = useVerificarProfissionais();

    return (
        <>
            <SafeEnvironment />
            <PageTitle
                title="Conheça os profissionais"
                subtitle="Preencha seu endereço e veja todos os profissionais da sua localidade"
            />
            <Container sx={{ mb: 10 }}>
                <FormElementContainer>
                    <TextFieldMask
                        mask="99999-999"
                        label="Digite seu CEP"
                        fullWidth
                        value={cep}
                        onChange={ev => setCep(ev.target.value)}
                    />
                    {error && <Typography color={'error'}>{error}</Typography>}
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: '220px' }}
                        disabled={!cepValido || isLoading}
                        onClick={() => buscarProfissionais(cep)}
                    >
                        {isLoading ? <CircularProgress size={20} /> : 'Buscar'}
                    </Button>
                </FormElementContainer>

                {buscaFeita &&
                    (diaristas.length === 0 ? (
                        <Typography>
                            Ainda não temos nenhum(a) diarista em sua região
                        </Typography>
                    ) : (
                        <ProfissionaisPaper>
                            <ProfissionaisContainer>
                                {diaristas.map((diarista, index) => (
                                    <UserInformation
                                        key={index}
                                        name={diarista.nome_completo}
                                        picture={diarista.foto_usuario || ''}
                                        rating={diarista.reputacao || 0}
                                        description={diarista.cidade}
                                    />
                                ))}
                            </ProfissionaisContainer>
                            {diaristasRestantes > 0 && (
                                <Container sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ mt: 5 }}
                                    >
                                        ...e mais {diaristasRestantes}{' '}
                                        {diaristas.length > 1
                                            ? ' profissionais atendem'
                                            : ' profissional atende'}{' '}
                                        ao seu endereço
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{ mt: 5 }}
                                    >
                                        Contratar um(a) profissional
                                    </Button>
                                </Container>
                            )}
                        </ProfissionaisPaper>
                    ))}
            </Container>
        </>
    );
};

export default VerificarProfissionais;
