import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/ofijan_logo.png';

const { Meta } = Card;

const Index = ({ exams }) => {
    if (!exams) {
        return <>no data</>;
    }
    console.log('received exams', exams.exams);

    return (
        <Wrapper className="examsholder">
            <Card
                key={exams.id}
                className="exams_card"
                cover={<img alt="logo" src={Logo} />}
                actions={[
                    <Link to={`/ofijan_question_plate/${exams.id}`}>
                        <Button type="primary">Open</Button>
                    </Link>
                ]}
            >
                <Meta
                    title={exams.exam_name ? exams.exam_name : 'No Name'}
                    description={exams.description ? exams.description : 'No Description!'}
                />
                <div className="underline"></div>
                <p>
                    <b>Booklet Name:</b> {exams.exam_name}
                </p>
                <p>
                    <b>Ofijan Id:</b> OF{exams.id}{exams.id}IN
                </p>
                <p>
                    <b>Prepared By:</b> Gaki Serocho
                </p>
                <p>
                    <b>Total no of Questions:</b> {exams.questions_count}
                </p>
                <p>
                    <b>Topics Covered:</b> 12
                </p>
            </Card>
        </Wrapper>
    );
};

export default Index;
