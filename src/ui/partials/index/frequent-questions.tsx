import {
    SectionContainer,
    Wave,
    SectionTitle,
    SectionSubtitle,
    AccordionStyled,
} from './frequent-questions.styled';
import {
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
} from '@mui/material';
import { useState } from 'react';

const questionList = [
    {
        question: 'Dúvida 1',
        answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, autem tempore facere repellendus fuga at repellat temporibus porro. Voluptates non ullam quos commodi iusto ad dolor sunt impedit eius ut.',
    },
    {
        question: 'Dúvida 2',
        answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, autem tempore facere repellendus fuga at repellat temporibus porro. Voluptates non ullam quos commodi iusto ad dolor sunt impedit eius ut.',
    },
    {
        question: 'Dúvida 3',
        answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, autem tempore facere repellendus fuga at repellat temporibus porro. Voluptates non ullam quos commodi iusto ad dolor sunt impedit eius ut.',
    },
    {
        question: 'Dúvida 4',
        answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, autem tempore facere repellendus fuga at repellat temporibus porro. Voluptates non ullam quos commodi iusto ad dolor sunt impedit eius ut.',
    },
];

const FrequentQuestions = () => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    function isOpen(accordionNumber: number): boolean {
        return activeAccordion === accordionNumber;
    }

    function changeOpenAccordion(accordionNumber: number) {
        if (isOpen(accordionNumber)) setActiveAccordion(0);
        else setActiveAccordion(accordionNumber);
    }

    function getIcon(accordionNumber: number) {
        return isOpen(accordionNumber) ? 'twf-minus' : 'twf-plus';
    }

    return (
        <SectionContainer>
            <Wave src={'/img/home/waves.svg'} />
            <Container>
                <SectionTitle>Ainda está com dúvidas?</SectionTitle>
                <SectionSubtitle>
                    Veja abaixo as perguntas frequentes
                </SectionSubtitle>

                {questionList.map((item, index) => (
                    <AccordionStyled
                        key={index}
                        expanded={isOpen(index + 1)}
                        onChange={() => changeOpenAccordion(index + 1)}
                    >
                        <AccordionSummary
                            expandIcon={<i className={getIcon(index + 1)} />}
                        >
                            <Typography color={'primary'}>
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>{item.answer}</AccordionDetails>
                    </AccordionStyled>
                ))}
            </Container>
        </SectionContainer>
    );
};

export default FrequentQuestions;
