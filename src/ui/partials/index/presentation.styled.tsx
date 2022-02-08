import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Link, { LinkProps } from 'ui/components/navigation/Link/Link';
import RoundedButton from 'ui/components/inputs/RoundedButton/RoundedButton';

export const SectionContainer = styled('section')`
    min-height: 250px;
    background-image: url('/img/home/living-room.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;
    position: relative;

    ${({ theme }) => theme.breakpoints.up('md')} {
        background-repeat: center;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        display: flex;
        text-align: center;
    }
`;

export const ContainerStyled = styled(Container)`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 'title', 'description' 'button';

    ${({ theme }) => theme.breakpoints.down('md')} {
        align-content: center;
        max-width: 350px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-template-columns: 450px minmax(200px, 450px);
        grid-template-rows: 125px 55px 60px;
        grid-template-areas: 'title picture' 'description picture' 'button picture';
        gap: ${({ theme }) => theme.spacing(4)};
        min-height: 450px;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: space-between;
`;

export const SectionPictureContainer = styled('div')`
    grid-area: picture;
    position: relative;

    img {
        position: relative;
        top: 35px;
        width: 100%;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        border-radius: 100%;
    }

    &::before {
        width: 130px;
        height: 130px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        z-index: 2;
        top: 20%;
        right: -5%;
    }

    &::after {
        width: 40px;
        height: 40px;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        z-index: 2;
        bottom: 0;
        right: 0;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const SectionTitle = styled('h1')`
    position: relative;
    margin: 0;
    grid-area: 'title';

    em {
        font-style: inherit;
    }

    .twf-search {
        position: absolute;
        top: 0;
        right: 0;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        border-radius: 50px;
        padding: ${({ theme }) => theme.spacing(2)};
        transform: translate(25%, -25%);
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        border: 4px solid ${({ theme }) => theme.palette.grey[200]};
        border-radius: 65px;
        padding: ${({ theme }) => theme.spacing(4) + ' ' + theme.spacing(8)};
        line-height: 30px;

        em {
            color: ${({ theme }) => theme.palette.primary.main};
        }
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: ${({ theme }) => theme.typography.body1};
        font-weight: normal;

        .twf-search {
            display: none;
        }
    }
`;

export const BottomButton = styled('span')`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 11px 12px;
    border-radius: 50px;
    color: ${({ theme }) => theme.palette.common.white};
    border: 5px solid currentColor;

    i {
        position: relative;
        left: -2px;
    }
`;

export const SectionDescription = styled('p')`
    grid-area: 'description';

    ${({ theme }) => theme.breakpoints.up('md')} {
        width: 350px;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        margin: 0 0 ${({ theme }) => theme.spacing(5)};
    }
`;

export const SectionButton = styled((props: LinkProps) => (
    <Link {...props} Component={RoundedButton} />
))`
    grid-area: 'button';

    ${({ theme }) => theme.breakpoints.up('md')} {
        width: 405px;
        height: 100%;
    }
`;
