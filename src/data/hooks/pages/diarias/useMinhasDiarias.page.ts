import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { usePagination } from 'data/hooks/usePagination.hook';
import { ApiServiceHateoas, LinkResolver } from 'data/services/ApiService';
import { useContext, useState } from 'react';
import { mutate } from 'swr';

export function useMinhasDiarias() {
    const [diariaConfirmar, setDiariaConfirmar] = useState(
        {} as DiariaInterface
    );
    const isMobile = useIsMobile();
    const { diariaState } = useContext(DiariaContext);
    const { diarias } = diariaState;
    const { currentPage, itemsPerPage, setCurrentPage, totalPages } =
        usePagination(diarias, 5);
    const filteredData = diarias;

    function podeVisualizar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'self') !== undefined;
    }

    function podeConfirmar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'confirmar_diarista') !== undefined;
    }

    async function confirmarDiarista(diaria: DiariaInterface) {
        ApiServiceHateoas(diaria.links, 'confirmar_diarista', async (req) => {
            try {
                await req();
                setDiariaConfirmar({} as DiariaInterface);
                atualizarListaDiarias();
            } catch (e) {
                console.error(e);
            }
        });
    }

    function atualizarListaDiarias() {
        mutate('lista_diarias');
    }

    return {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        podeVisualizar,
        diariaConfirmar,
        setDiariaConfirmar,
        podeConfirmar,
        confirmarDiarista,
    };
}
