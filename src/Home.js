import React from 'react';
import { Link } from 'react-router-dom';
import ChainInterFace from "./interface";
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
                    <p><Link to={'/product/'+this.state.address }><img src="themes/images/etherium.png" alt="" /></Link></p>
                    <Link to={'/product/'+this.state.address } className="title">{this.state.name}</Link><br/>
                    <Link to={'/product/'+this.state.address } className="category">{this.state.crateOn}</Link>
                    <p className="price">{this.state.viewCount}</p>
                </div>
            </li>
        );
    }

}
export  default  class ProductList extends React.Component {

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
            chainInterface.publishProduct("Fatih",1,2,3,4,accs[0]);
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


