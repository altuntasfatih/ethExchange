import { default as Web3} from 'web3';
import product_registry from './build/ProductRegistry.json'
import buyer from './build/Buyer.json'
import seller from './build/Seller.json'
import product from './build/Product.json'


var  addrBuyer="0xc0054e3654a7d2967fc2547a8a0857ddc7106450"
var  addrSeller="0xc7f3f5cac19cccf38be9da0de65790de893d15dc"
var  addrPRegistry="0xe2de00f7819f9c3593ed5dd3803e9888221d74bd";

class ChainInterFace {

    constructor() {

        let web3;
        if (typeof window.web3 !== 'undefined') {
            console.warn("Using web3 detected from external source")

            web3 = new Web3(window.web3.currentProvider);
        } else {
            console.warn("No web3 detected. Falling back to http://127.0.0.1:8545");

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

    getProductList(){
        return true;
    }

}
export default ChainInterFace;