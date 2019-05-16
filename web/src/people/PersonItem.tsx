import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import './people.css';

export default class PersonItem extends React.Component<any, any> {

    /**
     * setting the checked state of the current person item, if there is none default it to false
     * 
     * if there is no localStorage for the person, create one and default it to false
     */
    constructor(props: any) {
        super(props);
        this.state = { checked: JSON.parse(localStorage[this.props.person.id] || 'false') };

        if(localStorage[this.props.person.id] === null){
            localStorage[this.props.person.id] = false;
            this.setState({ checked: false})
        }
    }

    /**
     * calls the handleRemoveClick from the parent component to remove it from the Db
     * 
     * also remove the item from localStorage so it doesn't get clogged up
     */
    handleRemoveClick = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
        this.props.handleRemoveClick(this.props.person.id);
        localStorage.removeItem(this.props.person.id);
    }

    /**
     * set localStorage of current person to what the current checked status of the
     * checkbox is
     * 
     * also set the state to the same value
     */
    handleFlagCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage[this.props.person.id] = e.target.checked;
        this.setState({ checked: e.target.checked });
    }

    render(){
        const { person } = this.props;

        return (
            <TableRow>
                <TableCell>
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.handleFlagCheck}
                        value="checked"
                    />
                </TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.age}</TableCell>
                <TableCell>{'£' + person.balance}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.address}</TableCell>
                <TableCell><a onClick={this.handleRemoveClick(person.id)}>Remove</a></TableCell>
            </TableRow>
        )
    }
}