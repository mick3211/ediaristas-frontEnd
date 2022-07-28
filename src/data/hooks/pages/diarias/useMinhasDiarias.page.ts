import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { usePagination } from 'data/hooks/usePagination.hook';
import { LinkResolver } from 'data/services/ApiService';
import { useContext } from 'react';

export function useMinhasDiarias() {
    const isMobile = useIsMobile();
    const { diariaState } = useContext(DiariaContext);
    const { diarias } = diariaState;
    const { currentPage, itemsPerPage, setCurrentPage, totalPages } =
        usePagination(diarias, 5);
    const filteredData = diarias;

    function podeVisualizar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'self') !== undefined;
    }

    return {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        podeVisualizar,
    };
}
