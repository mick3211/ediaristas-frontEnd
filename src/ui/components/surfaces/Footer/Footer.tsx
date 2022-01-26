import {
    FooterContainer,
    FooterTitle,
    FooterListItem,
    SocialContainer,
    AppList,
    FooterSocialList,
    SocialButton,
    FooterGrid,
} from './Footer.style';
import { List, Box, Typography } from '@mui/material';
import Link from 'ui/components/navigation/Link/Link';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterGrid>
                <div>
                    <FooterTitle>Menu</FooterTitle>
                    <List>
                        <FooterListItem>
                            <Link
                                href="/encontrar-diarista"
                                mui={{ color: 'inherit', variant: 'body2' }}
                            >
                                Encontrar um(a) diarista
                            </Link>
                        </FooterListItem>
                        <FooterListItem>
                            <Link
                                href="/cadastro-diarista"
                                mui={{ color: 'inherit', variant: 'body2' }}
                            >
                                Seja um(a) diarista
                            </Link>
                        </FooterListItem>
                        <FooterListItem>
                            <Link
                                href="/"
                                mui={{ color: 'inherit', variant: 'body2' }}
                            >
                                Por que usar o e-diaristas?
                            </Link>
                        </FooterListItem>
                        <FooterListItem>
                            <Link
                                href="/"
                                mui={{ color: 'inherit', variant: 'body2' }}
                            >
                                Principais dúvidas
                            </Link>
                        </FooterListItem>
                    </List>
                </div>

                <Box sx={{ maxWidth: '400px' }}>
                    <FooterTitle>Quem somos</FooterTitle>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Consectetur nihil placeat quam veritatis
                        doloremque rerum tempore quaerat unde, reprehenderit
                        adipisci debitis, provident fuga cupiditate quidem nobis
                        vel velit iure odit?
                    </Typography>
                </Box>

                <SocialContainer>
                    <Box>
                        <FooterTitle>Baixe nossos aplicativos</FooterTitle>
                        <AppList>
                            <li>
                                <a
                                    href="/"
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                >
                                    <img
                                        src="/img/logos/app-store.png"
                                        alt="AppStore"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                >
                                    <img
                                        src="/img/logos/google-play.png"
                                        alt="Google Play"
                                    />
                                </a>
                            </li>
                        </AppList>
                    </Box>

                    <div>
                        <FooterTitle>Redes Sociais</FooterTitle>
                        <FooterSocialList>
                            <FooterListItem>
                                <SocialButton href={'/'}>
                                    <i className="twf-facebook-f"></i>
                                </SocialButton>
                            </FooterListItem>
                            <FooterListItem>
                                <SocialButton href={'/'}>
                                    <i className="twf-instagram"></i>
                                </SocialButton>
                            </FooterListItem>
                            <FooterListItem>
                                <SocialButton href={'/'}>
                                    <i className="twf-youtube"></i>
                                </SocialButton>
                            </FooterListItem>
                        </FooterSocialList>
                    </div>
                </SocialContainer>
            </FooterGrid>
        </FooterContainer>
    );
};

export default Footer;
