import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ChainInterFace from "./app";

let chainInterface = new ChainInterFace();


class Product extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            address:props.value[1],
            name:"",
            crateOn:0,
            viewCount:0,
            owner:"",
        };

    }
    componentDidMount=()=>{
        let product=chainInterface.getProduct(this.state.address);
        let that = this;

        const temp=product.methods.generalInfo().call();
        temp.then(function(val) {
            that.setState({
                owner:val[0],
                name:val[1],
                viewCount:val[2],
                crateOn:val[3],

            })

        });
    }
    render() {

        return(
            <li className="span3">
                <div className="product-box">
                    <span className="sale_tag"></span>
                    <p><a href="about:blank"><img src="themes/images/etherium.png" alt="" /></a></p>
                    <a href="about:blank" className="title">{this.state.name}</a><br/>
                    <a href="about:blank" className="category">{this.state.crateOn}</a>
                    <p className="price">{this.state.viewCount}</p>
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
            productArray:[],
        };

    }
    componentDidMount =()=>{
        this.setAddress();
        chainInterface.getProductList(this);

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

        const listProduct = this.state.productArray.map((item,index) =>

            <div key={index}>
                {this.renderProduct(item)}
            </div>
        );

        //console.log(listProduct);

        return (
            <div className="row">
                <div className="span12">
                    <div className="row">
                        <div className="span12">
                            <h4 className="title">
                                <span className="pull-left"><span className="text"><span className="line">Feature <strong>Products</strong></span></span></span>
                                <span className="pull-right"><a className="left button" href="#myCarousel" data-slide="prev"></a><a className="right button" href="#myCarousel" data-slide="next"></a>
									</span>
                            </h4>
                            <div id="myCarousel" className="myCarousel carousel slide">
                                <div className="carousel-inner">
                                    <div className="active item">
                                        <ul className="thumbnails">
                                            {listProduct}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>


        );
    }


}

ReactDOM.render(
    <ProductList />,
    document.getElementById('main_component')
);


