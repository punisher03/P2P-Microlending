import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import RepayForm from '../../../components/repayform';
import LenderForm from '../../../components/lenderwith';
import borrowerwith from '../../../components/ContributeForm';
import { Link } from '../../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.loanAmount().call();
    const summary4 = await campaign.methods.borrowerAddress().call();
    const summary5 = await campaign.methods.repaymentDeadline().call();
    const summary8 = await campaign.methods.amountLeftToRepay().call();


    return {
      address: props.query.address,
      loanAmount: summary,
      borrowerAddress: summary4,
      repayDeadline: summary5,
      amountLeftToRepay: summary8,
    };
  }

  renderCards() {
    const {
      loanAmount,
      borrowerAddress,
      repayDeadline,
      amountLeftToRepay
    } = this.props;

    const items = [
      {
        header: borrowerAddress ,
        meta: 'Address of borrower',
        description:
          'The borrower created this loan ',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: loanAmount,
        meta: 'Amount of loan requested by the borrower',
        description:
          'This is the amount which he needs to satisfy his needs'
      },
      {
        header: repayDeadline,
        meta: 'Has to repay within this time',
        description:
          'This is the time the borrower has left to repay the loan'
      },
      {
        header: amountLeftToRepay,
        meta: 'Amount of ether left to repay',
        description:
          'This is the amount of ether left to repay'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <RepayForm address={this.props.address} />
            </Grid.Column>

            <Grid.Column width={6}>
              <LenderForm address={this.props.address} />
            </Grid.Column>

          </Grid.Row>

          
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
