import Presentation from '@partials/index/presentation';
import FrequentQuestions from '@partials/index/frequent-questions';
import Advantages from '@partials/index/advantages';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Início',
        },
    };
};

export default function Index() {
    return (
        <div>
            <Presentation />
            <Advantages />
            <FrequentQuestions />
        </div>
    );
}
