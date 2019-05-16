import * as React from 'react'
import { JsonServiceClient } from '@servicestack/client';
import { CreatePerson, Person } from '../dtos';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { DialogActions, Button, InputAdornment } from '@material-ui/core';
import './people.css';

export default class AddPeople extends React.Component<any, any> {

  client = new JsonServiceClient('http://localhost:3000');

  constructor(props: any){
    super(props);
    this.state = { loading: true };
  }

  handleOnClose = () => {
    this.props.handleOnClose();
  }

  /**
   * creating a new person from the variables on the state
   * and then assigning it to the create person endpoint object
   * to then get passed into the save person function
   */
  handleOnSave = () => {
    const person = new Person();
    person.name = this.state.name;
    person.age = this.state.age;
    person.balance = this.state.balance;
    person.email = this.state.email;
    person.address = this.state.address;

    const request = new CreatePerson();
    request.person = person;
    this.savePerson(request);
    this.props.handleOnSave(person);
  }

  /**
   * passing the create person object request into the JSONServiceClient post function
   */
  async savePerson(request: CreatePerson) {
    await this.client.post(request);
  }

  /**
   * generic function for assigning text field values to the state
   * to then be used later to post to api
   */
  handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    this.setState({[name]: target.value})
  }

  /**
   * rendering a material-ui dialog to create a person
   */
  render(){
    return (
        <Dialog onClose={this.handleOnClose} open={this.props.open} maxWidth={'xs'} fullWidth={true}>
            <div className="people-col">
                <div className="people-row">
                    <DialogTitle>Add Person</DialogTitle>
                </div>
                <div className="people-row">
                    <TextField
                        className="textbox"
                        id="name"
                        label="Name"
                        onChange={this.handleInputChange}
                        />
                </div>
                <div className="people-row">
                    <TextField
                        className="textbox"
                        id="age"
                        label="Age"
                        type="number"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="people-row">
                    <TextField
                        className="textbox"
                        id="balance"
                        label="Balance"
                        type="number"
                        onChange={this.handleInputChange}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                £
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="people-row">
                    <TextField
                        className="textbox"
                        id="email"
                        label="Email"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="people-row">
                    <TextField
                        className="textbox"
                        id="address"
                        label="Address"
                        onChange={this.handleInputChange}
                        multiline={true}
                    />
                </div>
                <DialogActions>
                    <Button onClick={this.handleOnClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOnSave} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
  }
}
