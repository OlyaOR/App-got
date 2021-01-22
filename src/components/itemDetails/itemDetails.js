import React, {Component} from 'react';
import './itemDetails.css';
import GotServices from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {
    gotService = new GotServices();
    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then( this.onItemDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select item in the list</span>
        }
        const {item} = this.state;
        const {name} = item;

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}