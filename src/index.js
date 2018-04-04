import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


 class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

     search = (e) => {
        console.log("Search Clicked")
     }


    render() {
        return (
            <div className="row">
                <div className="span4">
                    <form method="POST" className="search_form">

                        <input type="text" className="input-block-level search-query" onKeyPress={this.search}/>
                    </form>
                </div>
                <div className="span8">
                    <div className="account pull-right">
                        <ul className="user-menu">
                            <li><a href="#">My Account</a></li>
                            <li><a href="cart.html">Your Cart</a></li>
                            <li><a href="checkout.html">Checkout</a></li>
                            <li><a href="register.html">Login</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
 }




/*

 */

ReactDOM.render(<App />, document.getElementById('main_component'));
ReactDOM.render(<Footer />, document.getElementById('top-bar'));


