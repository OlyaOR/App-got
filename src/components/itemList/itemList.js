import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class ItemList extends Component {

    state = {
        itemlist: null,
        error: false
    }
    
    componentDidMount() {
        const {getData} = this.props
        getData()
            .then((itemlist) => {
                this.setState({
                    itemlist
                })
            })
            .catch( () => this.onError())
    }
    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {name}
                </li>
            )
        })
    }
    render() {
        const {itemlist, error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        if (!itemlist) {
            return <Spinner/>;
        }
        const items = this.renderItems(itemlist);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}