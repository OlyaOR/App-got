import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import {withRouter} from 'react-router-dom';

export class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        )
    }
}
export default withRouter(BooksPage);