import web3 from './web3';
import CampaignFactory from './build/LoanFactory.json';

const instance=new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0EcC43FD90eF28cb6628a74F6f4b419Bf1F8FE78'
);

export default instance;
