import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../charPage/charPage';
import ErrorMessage from '../errorMessage/errorMessage';
import styled from 'styled-components';

const Btn = styled.button`
    background-color: #09177A;
    color: #CCD1F3;
    border: none;
    padding: 9px;
    margin-bottom: 40px;
    margin-right: 95px;
    type: button;
    border-radius: 10px
`;
export default class App extends Component  {
    state = {
        showRandomChar: false,
        error: false,
        //newRandomChar: false,
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            } 
        });
    }
    
    // changeRandomChar = () => {
    //     this.setState((state) => {
    //         return {
    //             newRandomChar: true
    //         } 
    //     });
    // }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        // const btn = this.state.showRandomChar ? <Btn onClick={this.changeRandomChar}>Change Random Character</Btn>: null;
        // const charNew = this.state.newRandomChar ? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='7' className="d-flex justify-content-between">
                            <Btn onClick={this.toggleRandomChar}> Toggle Random Character
                            </Btn>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    };
}