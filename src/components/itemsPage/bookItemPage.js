import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';

export default class BookItemPage extends Component {
    gotService = new GotService();
    
    render() {
        return (
            <ItemDetails itemId = {this.props.bookId} 
            getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}