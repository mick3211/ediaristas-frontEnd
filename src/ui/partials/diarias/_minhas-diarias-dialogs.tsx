import { Typography } from '@mui/material';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DateService } from 'data/services/DateService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import Dialog from 'ui/components/feedback/Dialog/Dialog';

interface DialogProps {
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void;
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
