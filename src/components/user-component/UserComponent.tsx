import React, { SyntheticEvent } from 'react'
import { Redirect } from 'react-router';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById, getAllUsersAPI } from '../../remote/Project1User';
import { Button, Table, Form, Label, Input, FormGroup } from 'reactstrap';
import { UserDisplayRow } from './UserDisplayRow';

interface IUserDisplayProps {
    user: User
    uUpdate: (id: any, uname: any, fname: any, lname: any, email: any, role: any) => void
}

interface IUserDisplayState {
    userById: User
    allUsers: User[]
    id: any
    uname: any
    fname: any
    lname: any
    email: any
    role: any
    success: string
    find: string
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
            role: '',
            success: '',
            find: ''
        }
    }

    async componentDidMount() {
        try {
            let u = await getUserById(this.props.user.user_id)
            console.log(u);
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    userById: u.body
                })
                console.log(this.props.user.user_id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    getAllUsers = async () => {
        if (this.state.allUsers.length === 0) {
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
        } else {
            this.setState({
                ...this.state,
                allUsers: []
            })
        }
    }

    updateId = async (e: any) => {
        let id = e.target.value
        try {
            let f = await getUserById(id)
            if (f.body.role === undefined) {
                this.setState({
                    ...this.state,
                    id: id,
                    uname: '',
                    fname: '',
                    lname: '',
                    email: '',
                    role: '',
                    find: 'There are no users with this id'
                })
            } else if (f.status === 200) {
                this.setState({
                    ...this.state,
                    id: id,
                    uname: f.body.username,
                    fname: f.body.first_name,
                    lname: f.body.last_name,
                    email: f.body.email,
                    role: f.body.role.role,
                    find: ''
                })
            }
        } catch (e) {
            console.log(e);
            this.setState({
                ...this.state,
                id: id,
                uname: '',
                fname: '',
                lname: '',
                email: '',
                role: '',
                find: 'There are no users with this id'
            })
        }
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

    updateRole = (e: any) => {
        this.setState({
            ...this.state,
            role: e.target.value
        });
    }

    updateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        this.props.uUpdate(this.state.id, this.state.uname, this.state.fname, this.state.lname, this.state.email, this.state.role)
    }

    render() {
        let rows = this.state.allUsers.map((e) => {
            return <UserDisplayRow user={e} key={'User ' + e.user_id} />
        })
        return (
            this.props.user.user_id ?
                <div>
                    <h1>You are logged in as:</h1>
                    <p id="CurrentFirst">{this.state.userById.username}</p>
                    <p className="CurrentUser">{this.state.userById.first_name}</p>
                    <p className="CurrentUser">{this.state.userById.last_name}</p>
                    <p className="CurrentUser">{this.state.userById.email}</p>
                    <p id="CurrentLast">{this.state.userById.role.role}</p>
                    <Button onClick={this.getAllUsers}>Toggle all users</Button>
                    {this.state.allUsers.length !== 0 ?
                        (<Table border="1" bordercolor='white'>
                            <thead>
                                <tr>
                                    <td>Username </td>
                                    <td>First Name </td>
                                    <td>Last Name </td>
                                    <td>Email</td>
                                    <td>Roles</td>
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
                            <Label for="user_id">Enter the id of the user you would like to update </Label>
                            <Input type="text" id="user_id" value={this.state.id} onChange={this.updateId} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userName">Enter their new username </Label>
                            <Input type="text" id="userName" value={this.state.uname} onChange={this.updateUName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">Enter their new First Name </Label>
                            <Input type="text" id="firstName" value={this.state.fname} onChange={this.updateFName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Enter their new Last Name </Label>
                            <Input type="text" id="lastName" value={this.state.lname} onChange={this.updateLName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Enter their new Email </Label>
                            <Input type="email" id="Email" value={this.state.email} onChange={this.updateEmail} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Enter their new Role </Label>
                            <select id="role">
                                <option></option>
                                <option value="Administrator">Administrator</option>
                                <option value="Finance-manager">Finance-manager</option>
                                <option value="User">User</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Button>Submit</Button>
                        </FormGroup>
                        <FormGroup>
                            <p>{this.state.find}</p>
                        </FormGroup>
                    </Form>
                </div>
                :
                <Redirect to='/login' />
        )
    }
}