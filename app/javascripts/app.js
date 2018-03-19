// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";



import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import product_registry from '../../build/contracts/ProductRegistry.json'
import buyer from '../../build/contracts/Buyer.json'
import seller from '../../build/contracts/Seller.json'
import product from '../../build/contracts/product.json'


var  addrBuyer="0x4e4e880edf3be969b7e687d8dab4daf363c35fbe"
var  addrSeller="0x7a24eec476fb37763b6bdef725c3c8baa8d6410e"
var  addrPRegistry="0x427f2ccd0070659e3b58e9c90f98fb6f36ced6e3";
var account;

window.App = {
  start: function() {
    var self = this;

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      window.App.account=accs[0];
      account=accs[0];
      self.refreshBalance();
    });

    window.App.seller=web3.eth.contract(seller.abi).at(addrSeller);
    window.App.buyer=web3.eth.contract(buyer.abi).at(addrBuyer);
    window.App.proRegistry=web3.eth.contract(product_registry.abi).at(addrPRegistry);
  },

  refreshBalance: function() {
    var balance = document.getElementById("balance");
    web3.eth.getBalance(account,function(err,result){
      balance.innerHTML = result;
    });
  },
  
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});