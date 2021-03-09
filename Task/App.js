import React from "react";
import "./App.css";
import TodoItems from "./components/TodoItems";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        e.preventDefault();
        if(this._inputElement.value !== '') {
            const newItem = {
                text: this._inputElement.value,
                key: Date.now(),
            };

            this.setState((prevState) => {
                // return {[...items, newItem]}
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        console.log(this.state.items);
        this._inputElement.value = '';
    }

    deleteItem(key) {
        const filterItems = this.state.items.filter((item) => {
            return item.key !== key;
        });

        this.setState({
            items: filterItems
        });
    }



    render() {
        return (
            <div className='todoListMain'>
                <div className="header">
                    <form onSubmit={this.addItem} >
                        <input type="text" placeholder="enter text" ref= { (a) => (this._inputElement = a)}/>
                        <button type="submit">add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items} delete={this.deleteItem} />
            </div>
        )
    }
}


export default App;
