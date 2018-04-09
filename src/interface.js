import { default as Web3} from 'web3';
import product_registry from './build/ProductRegistry.json'
import buyer from './build/Buyer.json'
import seller from './build/Seller.json'
import product from './build/Product.json'


var  addrBuyer="0xc0054e3654a7d2967fc2547a8a0857ddc7106450"
var  addrSeller="0xf17fffeba8a0070c1464ca88bfedb1a067fa144a"
var  addrPRegistry="0x88c015d75be972177f171efcf6fd708d095c83b5";


class ChainInterFace {

    constructor() {

        let web3;
        if (typeof window.web3 !== 'undefined') {
            console.warn("Using web3 detected from external source")

            web3 = new Web3(window.web3.currentProvider);
        } else {
            //console.warn("No metamask detected. Falling back to http://127.0.0.1:7557");

            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
        this.web3 = web3;

        this.productRegistry=new web3.eth.Contract(product_registry.abi,addrPRegistry);
        this.buyerContract=new web3.eth.Contract(buyer.abi,addrBuyer);
        this.sellerContract=new web3.eth.Contract(seller.abi,addrSeller);


    }
    getProduct(address){
        return new this.web3.eth.Contract(product.abi,address);
    }
    publishProduct(name,owner,minprice,price,file,address){
        console.log("Gelen adres",address);
        const temp=this.sellerContract.methods.publishProduct("haha",2,3).call({value:this.web3.utils.toWei("0.1",'ether'),from:address});
        temp.then(function(val,err) {
            console.log("in publish product",val,err);

        });


    }

    getProductList(referans){
        let that = referans;
        this.productRegistry.getPastEvents({
            fromBlock: 0,
            toBlock: 'latest'
        }, (err, event) => {
            let items=[];

            event.forEach(function(element) {
                element=element.returnValues;
                items.push([element.name,element.product,element.owner]);
            });
            that.setState({
                productArray:items,
            })
        })


    }

}
export default ChainInterFace;