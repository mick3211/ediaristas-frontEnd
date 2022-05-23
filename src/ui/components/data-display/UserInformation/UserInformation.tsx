import React from 'react';
//import { } from '@mui/material';
import { SystemProps } from '@mui/system';
import {
    UserName,
    UserDescription,
    UserInformationContainer,
    AvatarStyled,
    RatingStyled,
} from './UserInformation.styled';

export interface UserInformationProps {
    name: string;
    picture: string;
    rating: number;
    description?: string;
    isRating?: boolean;
    sx?: SystemProps;
}

const UserInformation: React.FC<UserInformationProps> = props => {
    return (
        <UserInformationContainer sx={props.sx} isRating={props.isRating}>
            <AvatarStyled src={props.picture}>{props.name[0]}</AvatarStyled>
            <RatingStyled value={props.rating} readOnly />
            <UserName>{props.name}</UserName>
            <UserDescription>{props.description}</UserDescription>
        </UserInformationContainer>
    );
};

export default UserInformation;
