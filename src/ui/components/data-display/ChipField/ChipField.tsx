import React from 'react';
// import { } from '@mui/material';
import { ChipStyled, ChipsContainer } from './ChipField.styled';

export interface ChipFieldProps {
    itemsList: string[];
    onDelete?: (item: string) => void;
    emptyMessage?: string;
}

const ChipField: React.FC<ChipFieldProps> = ({
    itemsList,
    emptyMessage = 'Nada selecionado ainda',
    ...props
}) => {
    function onDelete(item: string) {
        if (props.onDelete) {
            props.onDelete(item);
        }
    }

    return (
        <ChipsContainer>
            {itemsList.length ? (
                itemsList.map((item, index) => (
                    <li key={index}>
                        <ChipStyled
                            label={item}
                            deleteIcon={<i className="twf-times" />}
                            onDelete={() => onDelete(item)}
                        />
                    </li>
                ))
            ) : (
                <span>{emptyMessage}</span>
            )}
        </ChipsContainer>
    );
};

export default ChipField;
