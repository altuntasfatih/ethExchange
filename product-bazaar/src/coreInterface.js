import Web3 from 'web3'
import ipfsAPI from 'ipfs-api'

import registryJson from '../../build/contracts/ProductRegistry.json'
import factoryJson from '../../build/contracts/ProductFactory.json'

var productRegistry = '0x88c015d75be972177f171efcf6fd708d095c83b5'
var productFactory = '0xf17fffeba8a0070c1464ca88bfedb1a067fa144a'

var contracts = {}
let web3 = window.web3
var isInjected = false

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
  let productRContract = new web3.eth.Contract(registryJson.abi, productRegistry)
  let factoryContract = new web3.eth.Contract(factoryJson.abi, productFactory)
  isInjected = true
  contracts['Registry'] = productRContract
  contracts['Factory'] = factoryContract
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  let productRContract = new web3.eth.Contract(registryJson.abi, productRegistry)
  let factoryContract = new web3.eth.Contract(factoryJson.abi, productFactory)
  isInjected = true
  contracts['Registry'] = productRContract
  contracts['Factory'] = factoryContract
}

const NETWORKS = {
  '1': 'Main Net',
  '2': 'Deprecated Morden test network',
  '3': 'Ropsten test network',
  '4': 'Rinkeby test network',
  '42': 'Kovan test network'
}

const getNetIdString = async () => {
  const id = await web3.eth.net.getId()
  if (typeof id === 'number') {
    return NETWORKS[id] || 'Truffle Test Network'
  } else {
    return ''
  }
}

const getEthWallets = () =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (!err) return resolve(res)
      reject(err)
    })
  })
const getBalance = (account) =>
  new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (err, res) => {
      if (!err) return resolve(res)
      reject(err)
    })
  })
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

export { getEthWallets, getNetIdString, getBalance, isInjected, web3, contracts, ipfs }
