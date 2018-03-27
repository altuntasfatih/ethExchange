import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ChainInterFace from "./app";

let chainInterface = new ChainInterFace();



class Product extends React.Component{
    constructor(props){
        super(props);
        console.log("Address: ",props)
    }
    render() {
        return(
        <li className="span3">
            <div className="product-box">
                <span className="sale_tag"></span>
                <p><a href="product_detail.html"><img src="themes/images/ladies/1.jpg" alt="" /></a></p>
                <a href="product_detail.html" className="title">Ut wisi enim ad</a><br/>
                <a href="products.html" className="category">Commodo consequat</a>
                <p className="price">$17.25</p>
            </div>
        </li>
        );
    }

}
class ProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            account:"",
        };


    }
    componentDidMount =()=>{

       this.setAddress()
    }
    setAddress(){
        let that = this;

        chainInterface.web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length === 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            that.setState({
                account:accs[0],
            })

        });
    }

    renderProduct(address) {
        document.getElementById("accountAddress").innerText=this.state.account;
        return (
            <Product
                value={address}
            />
        );
    }

    render() {

        return (

        <div>
            {this.renderProduct(5)}
        </div>

        );
    }


}
/*
class NavBar extends React.Component {
    render(){
        return(
        <section className="navbar main-menu">
            <div className="navbar-inner main-menu">
                <a href="index.html" className="logo pull-left"><img src="themes/images/logo.png" class="site_logo" alt=""></img></a>
                <nav id="menu" className="pull-right">
                    <ul>
                        <li><a href="./products.html">Top Seller</a></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
    }

}
*/
// ========================================

ReactDOM.render(
  <ProductList />,
  document.getElementById('root')
);


/*
ReactDOM.render(
    <NavBar />,
    document.getElementById('nav_bar')
);


*/

