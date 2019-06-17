const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/LoanFactory.json');

const provider=new HDWalletProvider(
  'leopard demand river voyage paddle during notable roof survey inquiry timber gas',
  '	https://rinkeby.infura.io/B0rB4K43YVrZVcopTWdb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data:'0x'+ compiledFactory.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
