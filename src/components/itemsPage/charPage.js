import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Block from './block';

export default class CharPage extends Component {
    gotService = new GotService();
    state = {
        selectItem: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectItem: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render () {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}/>
            );

        const itemDetails = (
            <ItemDetails itemId = {this.state.selectItem} 
            getData={this.gotService.getCharacter}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <Block left={itemList} right={itemDetails} />
        )
    }
}

