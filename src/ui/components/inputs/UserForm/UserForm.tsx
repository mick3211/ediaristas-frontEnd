import React from 'react';
import { FormContainerStyled } from './UserForm.styled';
// import { } from '@mui/material';
//import { Component } from './UserForm.styled';

export interface UserFormProps {}

const UserForm: React.FC<UserFormProps> = () => {
    return (
        <div>
            <div>UserForm</div>
        </div>
    );
};

export default UserForm;
export const UserFormContainer = FormContainerStyled;
export * from './forms/AddressForm';
export * from './forms/NewContactForm';
export * from './forms/PaymentForm';
export * from './forms/PictureForm';
export * from './forms/UserDataForm';
export * from './forms/LoginForm';
