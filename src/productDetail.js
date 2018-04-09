import React from 'react';
import ChainInterFace from "./interface";

let chainInterface = new ChainInterFace();


export default  class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account:"",
            address:props.match.params.value,
            name:"",
            crateOn:0,
            viewCount:0,
            owner:"",
            product:"",
        };

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

    componentDidMount=()=>{

        //this.setAddress();
        let product=chainInterface.getProduct(this.state.address);
        this.setState({
            product:product,
        })
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

    lockProduct=()=>{
        console.log(this.state.product)
        console.log("Product Adress",this.state.address);
        const temp=this.state.product.methods.getLock().call();
        temp.then(function(val,err) {
            console.log("Lock Sahibi",val,err);

        });
        const temp2=this.state.product.methods.lockProduct(this.state.address).call();
        temp2.then(function(val,err) {
            console.log("Locklama Başarili",val,err);

        });



    }
    render() {


        return(
            <div>
            <div className="row">
                <div className="span9">
                    <div className="row">
                        <div className="span4">
                            <a href={null} className="thumbnail" data-fancybox-group="group1"
                               title="Description 1"><img alt="" src="../../../themes/images/etherium.png"/></a>
                        </div>
                        <div className="span5">
                            <address>
                                <strong>Owner:</strong> <span>{this.state.owner}</span><br/>
                                <strong>Name</strong> <span>{this.state.name}</span><br/>

                                <strong>View Count</strong> <span>{this.state.viewCount}</span><br/>
                                <strong>Created On</strong> <span>{this.state.crateOn}</span><br/>
                            </address>
                            <h4><strong>Price: $587.50</strong></h4>
                            <button onClick={this.lockProduct}>
                                Lock
                            </button>
                        </div>

                    </div>
                </div>
            </div>
    </div>

        );

    }
}
