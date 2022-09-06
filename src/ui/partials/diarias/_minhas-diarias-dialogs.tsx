import { Alert, Divider, Rating, Snackbar, Typography } from '@mui/material';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { DateService } from 'data/services/DateService';
import { TextFormatService } from 'data/services/TextFormatService';
import React, { useContext, useState } from 'react';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import TextField from 'ui/components/inputs/TextField/TextField';
import { RatingBox } from './_minhas-diarias.styled';

interface DialogProps {
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void;
}

interface RatingDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) => void;
}
interface CancelDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (diaria: DiariaInterface, motivo: string) => void;
}

const JobBox: React.FC<{ diaria: DiariaInterface }> = ({ diaria }) => {
    return (
        <JobInformation>
            <>
                <div>
                    Data:{' '}
                    <strong>
                        {TextFormatService.reverseDate(
                            diaria.data_atendimento as string
                        )}{' '}
                        às{' '}
                        {DateService.getTimeFromDate(
                            diaria.data_atendimento as string
                        )}
                    </strong>
                </div>
                <div>Endereço {TextFormatService.getAdress(diaria)}</div>
                <div>
                    <strong>
                        Valor: {TextFormatService.currency(diaria.preco)}
                    </strong>
                </div>
            </>
        </JobInformation>
    );
};

export const ConfirmDialog: React.FC<DialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
    children,
}) => {
    return (
        <Dialog
            isOpen={true}
            onClose={onCancel}
            onConfirm={() => onConfirm(diaria)}
            title="Confirmar presença do diarista"
            subtitle="Você confirma a presença do diarista na diária abaixo?"
        >
            <JobBox diaria={diaria} />
            <UserInformation
                name={diaria.diarista?.nome_completo || ''}
                rating={diaria.diarista?.reputacao || 1}
                description={
                    'Telefone: ' +
                    TextFormatService.formatPhoneNumber(
                        diaria.diarista.telefone || ''
                    )
                }
                picture={diaria.diarista.foto_usuario || ''}
            />
            <Typography
                sx={{ py: 2 }}
                variant="subtitle2"
                color="textSecondary"
            >
                Ao confirmar a presença do(a) diarista, você está definindo que
                o serviço foi realizado em sua residência e autoriza a
                plataforma a fazer o repasse do valor para o profissional. Caso
                você tenha algum problema, pode entrar em contato com a nossa
                equipe de suporte.
            </Typography>
        </Dialog>
    );
};

export const RatingDialog: React.FC<RatingDialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
    children,
}) => {
    const isMobile = useIsMobile();
    const [descricao, setDescricao] = useState('');
    const [nota, setNota] = useState(3);
    const [error, setError] = useState('');
    const {
        userState: { user },
    } = useContext(UserContext);
    const usuarioAvaliado =
        user.tipo_usuario === UserType.Cliente
            ? diaria?.diarista
            : diaria?.cliente;

    function tentarAvaliar() {
        if (descricao.length > 5) {
            onConfirm(diaria, { descricao, nota });
        } else {
            setError('Por favor, escreva um depoimento');
        }
    }

    return (
        <Dialog
            isOpen={true}
            onClose={onCancel}
            onConfirm={tentarAvaliar}
            title="Avaliar diária"
            subtitle="Avalie a diária abaixo"
        >
            <JobBox diaria={diaria} />
            <UserInformation
                name={usuarioAvaliado.nome_completo || ''}
                rating={usuarioAvaliado.reputacao || 1}
                description={
                    'Telefone: ' +
                    TextFormatService.formatPhoneNumber(
                        diaria.diarista.telefone || ''
                    )
                }
                picture={diaria.diarista.foto_usuario || ''}
            />
            <Divider sx={{ my: 4 }} />
            <Typography>Deixe a sua avaliação</Typography>
            <RatingBox>
                <strong>Nota:</strong>
                <Rating
                    size={isMobile ? 'large' : 'small'}
                    value={nota}
                    onChange={(_ev, value) => setNota(value || 1)}
                />
                <strong>Depoimento</strong>
                <TextField
                    label="Digite aqui o seu depoimento"
                    multiline
                    fullWidth
                    rows={3}
                    value={descricao}
                    onChange={(ev) => setDescricao(ev.target.value)}
                />
            </RatingBox>

            <Snackbar
                open={error.length > 0}
                onClose={() => setError('')}
                autoHideDuration={4000}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Dialog>
    );
};

export const CancelDialog: React.FC<CancelDialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
    children,
}) => {
    const [motivo, setMotivo] = useState('');
    const [error, setError] = useState('');
    const {
        userState: { user },
    } = useContext(UserContext);

    function tentarCancelar() {
        if (motivo.length > 5) {
            onConfirm(diaria, motivo);
        } else {
            setError('Por favor, escreva um motivo para o cancelamento');
        }
    }

    function getAviso(): string {
        if (user.id) {
            if (user.tipo_usuario === UserType.Diarista)
                return 'Ao cancelar uma diária, você pode ser penalizado(a) com a diminuição da sua reputação. Quanto menor a sua reputação, menor a chance de ser selecionado(a) para as próximas diárias. O cancelamento de diárias deve ser feito somente em situações de excessão';
            if (
                DateService.getDifferenceHours(
                    new Date(diaria.data_atendimento)
                ) < 24
            )
                return 'Ao cancelar a diária, devido à proximidade com o horário agendado do serviço, será cobrada uma multa de 50% sobre o valor da diária. O cancelamento de diárias deve ser feito somente em situações de excessão.';
            return 'Ao cancelar a diária, o(a) profissional contratado(a) será prejudicado(a)... :`(';
        }
        return '';
    }

    return (
        <Dialog
            isOpen={true}
            onClose={onCancel}
            onConfirm={tentarCancelar}
            title="Cancelar diária?"
            subtitle="Tem certeza que deseja cancelar a diária abaixo?"
        >
            <JobBox diaria={diaria} />

            <TextField
                label="Digite aqui o motivo do cancelamento"
                multiline
                fullWidth
                rows={5}
                value={motivo}
                onChange={(ev) => setMotivo(ev.target.value)}
            />

            <Typography
                sx={{ py: 2 }}
                variant="subtitle2"
                color="textSecondary"
            >
                {getAviso()}
            </Typography>

            <Snackbar
                open={error.length > 0}
                onClose={() => setError('')}
                autoHideDuration={4000}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Dialog>
    );
};
