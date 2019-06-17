import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    borrowerAddress: '',
    fundAmount: '',
    fundDuration: '',
    repayDeadline:'',
    name:'',
    use:'',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const { borrowerAddress, fundAmount , fundDuration, repayDeadline, name, use } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await ethereum.enable();
      await factory.methods
        .createCampaign(borrowerAddress, fundAmount, fundDuration, repayDeadline, name, use)
        .send({
          from: accounts[0],
          gas:5000000
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Address of the Borrower</label>
            <Input
              value={this.state.borrowerAddress}
              onChange={event =>
                this.setState({ borrowerAddress: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Loan amount</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.fundAmount}
              onChange={event =>
                this.setState({ fundAmount: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Fund duration</label>
            <Input
              value={this.state.fundDuration}
              onChange={event =>
                this.setState({ fundDuration: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Repay deadline</label>
            <Input
              value={this.state.repayDeadline}
              onChange={event =>
                this.setState({ repayDeadline: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>What do you want the loan for?</label>
            <Input
              value={this.state.use}
              onChange={event =>
                this.setState({ use: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
