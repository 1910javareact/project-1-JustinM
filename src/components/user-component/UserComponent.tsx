import React, { SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById, getAllUsersAPI } from '../../remote/project1-clients/Project1User';
import { Button, Table, Form, Label, Input, FormGroup } from 'reactstrap';
import { UserDisplayRow } from './UserDisplayRow';

interface IUserDisplayProps {
    user: User
    uUpdate: (id: any, uname: any, fname: any, lname: any, email: any) => void
}

interface IUserDisplayState {
    userById: User
    allUsers: User[]
    id: any
    uname: any
    fname: any
    lname: any
    email: any
    success: string
}

export class UserDisplay extends React.Component<IUserDisplayProps, IUserDisplayState> {
    constructor(props: any) {
        super(props)
        this.state = {
            userById: new User(0, '', '', '', '', '', new Role(0, '')),
            allUsers: [],
            id: '',
            uname: '',
            fname: '',
            lname: '',
            email: '',
            success: ''
        }
    }

    async componentDidMount() {
        try {
            let u = await getUserById(this.props.user.user_id)
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    userById: u.body[0]
                })
                console.log(this.props.user.user_id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    getAllUsers = async () => {
        try {
            let u = await getAllUsersAPI()
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    allUsers: u.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    updateId = (e: any) => {
        this.setState({
            ...this.state,
            id: e.target.value
        });
    }

    updateUName = (e: any) => {
        this.setState({
            ...this.state,
            uname: e.target.value
        });
    }

    updateFName = (e: any) => {
        this.setState({
            ...this.state,
            fname: e.target.value
        });
    }

    updateLName = (e: any) => {
        this.setState({
            ...this.state,
            lname: e.target.value
        });
    }

    updateEmail = (e: any) => {
        this.setState({
            ...this.state,
            email: e.target.value
        });
    }

    updateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        this.props.uUpdate(this.state.id, this.state.uname, this.state.fname, this.state.lname, this.state.email)
    }

    render() {
        let rows = this.state.allUsers.map((e) => {
            return <UserDisplayRow user={e} key={'User ' + e.user_id} />
        })
        return (
            this.props.user.user_id !== undefined ? 
            <div>
                <h1>You are logged in as:</h1>
                <p>{this.state.userById.username}</p>
                <p>{this.state.userById.first_name}</p>
                <p>{this.state.userById.last_name}</p>
                <p>{this.state.userById.email}</p>
                <p>{JSON.stringify(this.state.userById.role)}</p>
                <Button onClick={this.getAllUsers}>View all users</Button>
                { this.state.allUsers !== null ?
                (<Table border="1" bordercolor='white'>
                    <thead>
                        <tr>
                            <td>Username </td>
                            <td>First Name </td>
                            <td>Last Name </td>
                            <td>Email</td>
                            {/* <td>Roles</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>) : (
                    null
                )
                }
                <Form onSubmit={this.updateUser}>
                    <FormGroup>
                        <Label for="user_id">Update user</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="user_id">Enter the id of the user you would like to update</Label>
                        <Input type="text" id="user_id" value={this.state.id} onChange={this.updateId} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userName">Enter their new username</Label>
                        <Input type="text" id="userName" value={this.state.uname} onChange={this.updateUName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstName">Enter their new First Name</Label>
                        <Input type="text" id="firstName" value={this.state.fname} onChange={this.updateFName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Enter their new Last Name</Label>
                        <Input type="text" id="lastName" value={this.state.lname} onChange={this.updateLName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Email">Enter their new Email</Label>
                        <Input type="text" id="Email" value={this.state.email} onChange={this.updateEmail}/>
                    </FormGroup>
                    <FormGroup>
                        <Button>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
            :
            <Redirect to = '/login' />
        )
    }
}