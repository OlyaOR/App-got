import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {
    gotService = new GotService();
    state = {
        charlist: null,
        error: false
    }
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charlist) => {
                this.setState({
                    charlist
                })
            })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}
                    >
                    {name}
                </li>
            )
        })
    }
    render() {
        const {charlist, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>;
        }
        if (!charlist) {
            return <Spinner/>;
        }
        const items = this.renderItems(charlist);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}