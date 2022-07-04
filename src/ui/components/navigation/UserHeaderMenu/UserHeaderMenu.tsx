import { Divider } from '@mui/material';
import { UserInterface } from 'data/@types/UserInterface';
import React, { useRef } from 'react';
import UserProfileAvatar from 'ui/components/data-display/UserProfileAvatar/UserProfileAvatar';
import Link from '../Link/Link';
// import { } from '@mui/material';
import { UserMenu, UserHeaderMenuContainer } from './UserHeaderMenu.styled';

export interface UserHeaderMenuProps {
    user: UserInterface;
    isMenuOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMenuClick?: (event: React.MouseEvent) => void;
    onMenuClose?: (event: React.MouseEvent) => void;
    onLogout?: () => void;
}

const UserHeaderMenu: React.FC<UserHeaderMenuProps> = (props) => {
    const containerRef = useRef(null);

    return (
        <UserHeaderMenuContainer ref={containerRef}>
            <UserProfileAvatar user={props.user} onClick={props.onClick} />
            <UserMenu
                open={props.isMenuOpen}
                onClose={props.onMenuClose}
                onClick={props.onMenuClick}
                anchorEl={containerRef.current}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <li>
                    <Link href="alterar-dados" mui={{ color: 'inherit' }}>
                        Alterar Dados
                    </Link>
                </li>
                <Divider />
                <li>
                    <Link
                        onClick={props.onLogout}
                        href=""
                        mui={{ color: 'inherit' }}
                    >
                        Sair
                    </Link>
                </li>
            </UserMenu>
        </UserHeaderMenuContainer>
    );
};

export default UserHeaderMenu;
