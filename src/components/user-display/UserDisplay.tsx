import React from 'react'
//import { Redirect } from 'react-router';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById, getAllUsersAPI } from '../../remote/project1-user-clients/Project1User';
import { Button, Table } from 'reactstrap';
import { UserDisplayRow } from './UserDisplayRow';

interface IUserDisplayState {
    userById: User
    allUsers: User[]
}

export class UserDisplay extends React.Component<any, IUserDisplayState> {
    constructor (props: any) {
        super(props)
        this.state = {
            userById: new User(0, '', '', '', '', '', new Role(0, '')),
            allUsers: []
        }
    }

    async componentDidMount() {
        try {
            let u = await getUserById(this.props.user.user_id)
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    userById: u.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    getAllUsers = async() => {
        try {
            let u = await getAllUsersAPI()
            if(u.status === 200) {
                this.setState({
                    ...this.state,
                    allUsers: u.body
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        let rows = this.state.allUsers.map((e) => {
            return <UserDisplayRow user={e} key={'User ' + e.user_id} />
        })
        return (
            //this.props.user.user_id ?
            <div>
                <h1>You are logged in as:</h1>
                <h2>{this.props.user.username}</h2>
                <h2>{this.props.user.first_name}</h2>
                <h2>{this.props.user.last_name}</h2>
                <h2>{this.props.user.email}</h2>
                <h2>{JSON.stringify(this.props.user.role)}</h2>
                <Button onClick={this.getAllUsers}>View all users</Button>
                <Table bordered>
                    <thead>
                        <tr>
                            <td>Username, </td>
                            <td>First Name, </td>
                            <td>Last Name, </td>
                            <td>Email</td>
                            {/* <td>Roles</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div> 
            // :
            // <Redirect to = '/login' />
        )
    }
}