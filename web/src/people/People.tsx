import * as React from 'react'
import { JsonServiceClient } from '@servicestack/client';
import { People as p, Person, DeletePerson } from '../dtos'
import AddPeople from './AddPeople';
import Button from '@material-ui/core/Button';
import PersonItem from './PersonItem';
import './people.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class People extends React.Component<any, any> {

  // initialising serviceclient to talk to api
  client = new JsonServiceClient('http://localhost:3000');

  constructor(props: any){
    super(props);
    this.state = { allPeople: null, loading: true, open: false };
  }

  componentDidMount(){
    this.getAllPeople();
  }

  async getAllPeople(){
    const allPeople = await this.client.get(new p())
    this.setState({ allPeople, loading: false});
  }

  handleOnAddClick = () => {
    this.setState({open: true})
  }

  /**
   * passes in the id of the person to assign to the delete person requect object
   * once it is deleted, instead of having another api call to get the new list of
   * people - it splices the array if the return value of the request is true
   */
  handleOnRemoveClick = (id: number) => {
    const request = new DeletePerson();
    request.id = id;
    const deleted = this.removePerson(request);
    if(deleted){
      const people: Person[] = this.state.allPeople;
      const index = people.findIndex(person => person.id === id);
      people.splice(index, 1);
      this.setState({allPeople: people})
    }
  }

  async removePerson(request: DeletePerson){
    return await this.client.delete(request);
  }

  handleOnClose = () => {
    this.setState({open: false});
  }

  handleOnSave = (person: Person) => {
    const allPeople = this.state.allPeople;
    allPeople.push(person);
    this.setState({allPeople, open: false});
  }

  /**
   * used for sorting the name and email fields.
   * 
   * made generic so it can be used for any field, and it is toggleable (reusable)
   */
  sortField = (field: string) => (e: any) => {
    const asc = this.state.sort ? false : true;
    const sortPeople: Person[] = this.state.allPeople.sort((a: any, b: any) => {
      return a[field] > b[field] ? (asc ? 1 : -1) : a[field] < b[field] ? (asc ? -1 : 1) : 0;
    })

    this.setState({allPeople: sortPeople, sort: asc})
  }

  /**
   * loading state variable in case the data is too large and hasn't finished the api call
   * 
   * is a basic material-ui table, with it mapped through all the people and then calling the 
   * PersonItem component which returns a row of the person data.
   */
  render(){
    if(this.state.loading){
      return 'loading'
    }

    return (
      <div className="people-main">
        <AddPeople open={this.state.open} handleOnClose={this.handleOnClose} handleOnSave={this.handleOnSave} />
        <div className="people-col">
          <div className="people-row">
            <h3>Flexera Code Test</h3>
          </div>
          <div className="people-row">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className="sort-field" onClick={this.sortField('name')}>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell className="sort-field" onClick={this.sortField('email')}>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.allPeople && this.state.allPeople.map((person: Person) => {
                    return (
                      <PersonItem key={person.id} person={person} handleRemoveClick={this.handleOnRemoveClick} />
                    )
                  })}
                </TableBody>
              </Table>
          </div>
          <div className="people-row">
            <Button variant="contained" onClick={this.handleOnAddClick}>
              Add Person
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
