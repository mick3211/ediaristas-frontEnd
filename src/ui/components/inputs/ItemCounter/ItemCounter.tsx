import React from 'react';
// import { } from '@mui/material';
import { CircleButton, ItemCounterContainer } from './ItemCounter.styled';

export interface ItemCounterProps {
    label: string;
    plural: string;
    counter: number;
    onInc: () => void;
    onDec: () => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
    counter = 0,
    label,
    onDec,
    onInc,
    plural,
}: ItemCounterProps) => {
    return (
        <ItemCounterContainer>
            <CircleButton onClick={onDec}>
                <i className="twf-minus"></i>
            </CircleButton>
            <span>
                {counter + ' '}
                {counter > 1 ? plural : label}
            </span>
            <CircleButton onClick={onInc}>
                <i className="twf-plus"></i>
            </CircleButton>
        </ItemCounterContainer>
    );
};

export default ItemCounter;
