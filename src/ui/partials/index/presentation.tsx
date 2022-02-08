import { useEffect, useState } from 'react';
import {
    SectionContainer,
    ContainerStyled,
    SectionTitle,
    SectionButton,
    SectionDescription,
    SectionPictureContainer,
    BottomButton,
} from './presentation.styled';

const Presentation = () => {
    const [cleanerPicture, setCleanerPicture] = useState('');

    useEffect(() => {
        const newCleanerPicture =
            Math.random() < 0.5
                ? '/img/home/housekeeper.png'
                : '/img/home/janitor.png';
        setCleanerPicture(newCleanerPicture);
    }, []);

    return (
        <SectionContainer>
            <ContainerStyled>
                <SectionTitle>
                    Encontre agora mesmo um(a) <em>diarista</em>
                    <i className={'twf-search'} />
                </SectionTitle>
                <SectionDescription>
                    São mais de 5000 profissionais esperando por você
                </SectionDescription>
                <SectionButton
                    mui={{ variant: 'contained' }}
                    href="/encontrar-diarista"
                >
                    Encontrar um(a) diarista
                </SectionButton>
                <SectionPictureContainer>
                    <img src={cleanerPicture} alt="" />
                </SectionPictureContainer>
            </ContainerStyled>
            <BottomButton>
                <i className="twf-caret-down"></i>
            </BottomButton>
        </SectionContainer>
    );
};

export default Presentation;
