import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import BorrowerForm from '../../components/borrowerwith';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.loanAmount().call();
    const summary1 = await campaign.methods.name().call();
    const summary2 = await campaign.methods.amountLeftToFund().call();
    const summary3 = await campaign.methods.amountRaised().call();
    const summary4 = await campaign.methods.borrowerAddress().call();
    const summary6 = await campaign.methods.use().call();
    const summary7 = await campaign.methods.numLenders().call();

    return {
      address: props.query.address,
      loanAmount: summary,
      name: summary1,
      amountLeftToFund: summary2,
      amountRaised: summary3,
      borrowerAddress: summary4,
      use: summary6,
      numLenders: summary7


    };
  }

  renderCards() {
    const {
      loanAmount,
      name,
      amountLeftToFund,
      amountRaised,
      borrowerAddress,
      use,
      numLenders
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
        header: name,
        meta: 'Name of the borrower',
        description:
          'This is the guy who asked for the loan'
      },
      {
        header: amountLeftToFund,
        meta: 'Amount left',
        description:
          'This is the pending amount of ethers'
      },
      {
        header: amountRaised,
        meta: 'Amount of ether raised already',
        description:
          'This is the amount of ether raised already'
      },
      {
        header: use,
        meta: 'USE',
        description:
          'This is why the borrower wants the loan'
      },
      {
        header: numLenders,
        meta: 'Number of lenders',
        description:
          'This is the number of kind lenders who have loaned'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Details of the loan</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>

            <Grid.Column width={6}>
              <BorrowerForm address={this.props.address} />
            </Grid.Column>

          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Click here if you wanna repay</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
