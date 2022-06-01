import React from 'react';
// import { } from '@mui/material';
import { BreadcrumbContainer, BreadcrumbItem } from './Breadcrumb.styled';

export interface BreadcrumbProps {
    selected: string;
    items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    selected,
    items,
}: BreadcrumbProps) => {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    <BreadcrumbItem isSelected={item === selected}>
                        {item}
                    </BreadcrumbItem>
                    {index !== items.length - 1 && <span> &gt; </span>}
                </React.Fragment>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
