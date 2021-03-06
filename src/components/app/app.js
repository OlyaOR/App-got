import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharPage from '../itemsPage/charPage';
import BookPage from '../itemsPage/bookPage';
import BookItemPage from '../itemsPage/bookItemPage';
import HousePage from '../itemsPage/housePage';
import ErrorMessage from '../errorMessage/errorMessage';
import styled from 'styled-components';
import './app.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';// маршрутизация - установка путей для отображения разных частей на странице(spa), используем тут и где ссылки (header)

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
        error: false
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            } 
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return ( // оборачиваем в div с классом, так как при оборачивании в Router могут теряться стили
            <Router>
                <div className='app'> 
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
                        <Switch>
                            <Route path='/' exact component={() => 
                                <h1>Welcome to Game of Thrones DB!<br></br>
                                    Сhoose any category you like.</h1>}/>
                            <Route path='/characters' exact component={CharPage}/>
                            <Route path='/books' exact component={BookPage}/>
                            <Route path='/books/:id'exact render={({match}) => {
                                const {id} = match.params;
                            return <BookItemPage bookId={id}/>}}/>
                            <Route path='/houses' exact component={HousePage} />
                            <Route path='/*' exact component={ErrorMessage}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    };
}