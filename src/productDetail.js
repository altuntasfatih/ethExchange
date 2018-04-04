import React from 'react';
import ChainInterFace from "./interface";

let chainInterface = new ChainInterFace();


export default  class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            address:props.match.params.value,
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

            <div className="row">
                <div className="span9">
                    <div className="row">
                        <div className="span4">
                            <a href="#" className="thumbnail" data-fancybox-group="group1"
                               title="Description 1"><img alt="" src="themes/images/1.jpg"/></a>
                        </div>
                        <div className="span5">
                            <address>
                                <strong>Owner:</strong> <span>{this.state.owner}</span><br/>
                                <strong>Name</strong> <span>{this.state.name}</span><br/>
                                <strong>View Count</strong> <span>{this.state.viewCount}</span><br/>
                                <strong>Created On</strong> <span>{this.state.crateOn}</span><br/>
                            </address>
                            <h4><strong>Price: $587.50</strong></h4>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}
