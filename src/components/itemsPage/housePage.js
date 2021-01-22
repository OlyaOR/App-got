import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Block from './block'

export default class HousePage extends Component {
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
            getData={this.gotService.getAllHouses}/>
            );

        const itemDetails = (
            <ItemDetails itemId = {this.state.selectItem} 
            getData={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        );

        return (
            <Block left={itemList} right={itemDetails} />
        )
    }
}

