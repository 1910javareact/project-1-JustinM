import React, { SyntheticEvent } from 'react'
import { Reimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById } from '../../remote/Project1User';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { ReimburseDisplayRow } from './ReimburseDisplayRow';
import { Redirect } from 'react-router';

interface IReimDisplayProps {
    user: User
    reimburse: Reimbursement
    rPost: (id: number, author: number, amount: number, submitted: string, resolved: string, description: string, resolver: any, status: number, type: number) => void;
    rFindByStatus: (status: number) => void
    rFindByUser: (user_id: number) => void
    rUpdateReimburse: (reimburse_id: number, resolved: string, resolver: number, status: number) => void
    allReimburse: Reimbursement[]
    allReimburseUser: Reimbursement[]
}

export class ReimDisplay extends React.Component<IReimDisplayProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            userById: new User(0, '', '', '', '', '', new Role(0, '')),
            allReimburse: [],
            allReimburseUser: [],

            id: '',
            amount: '',
            submitted: '',
            resolved: '',
            description: '',
            resolver: '',
            status: '',
            type: '',

            success: '',
            showMenu: false,
            rById: '',
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

    updateId = (e: any) => {
        this.setState({
            ...this.state,
            id: e.target.value
        })
    }

    updateAmount = (e: any) => {
        this.setState({
            ...this.state,
            amount: e.target.value
        });
    }

    updateDescription = (e: any) => {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    updateStatus = (e: any) => {
        this.setState({
            ...this.state,
            status: e.target.value
        });
    }

    updateType = (e: any) => {
        this.setState({
            ...this.state,
            type: e.target.value
        });
    }

    updateRById = (e: any) => {
        this.setState({
            ...this.state,
            rById: e.target.value
        })
    }

    updateReimburse_id = (e: any) => {
        this.setState({
            ...this.state,
            reimburse_id: e.target.value
        })
    }

    postReimburse = async (e: SyntheticEvent) => {
        let today = new Date();
        e.preventDefault();
        this.props.rPost(this.state.reimburse_id, this.state.userById.user_id, this.state.amount, `${today.getFullYear()}-${today.getDate()}-${today.getMonth()}`, '', this.state.description, 1, 1, this.state.type)
    }

    findReimburseByStatus = async (e: any) => {
        e.preventDefault();
        if (e.target.value === 'Pending') {
            this.props.rFindByStatus(1)
        }
        if (e.target.value === 'Approved') {
            this.props.rFindByStatus(2)
        }
        if (e.target.value === 'Denied') {
            this.props.rFindByStatus(3)
        }
    }

    findReimburseByUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        this.props.rFindByUser(this.state.rById)
    }

    updateReimburse = async (e: SyntheticEvent) => {
        let today = new Date();
        e.preventDefault();
        this.props.rUpdateReimburse(this.state.id, `${today.getFullYear()}-${today.getDate()}-${today.getMonth()}`, this.state.userById.user_id, this.state.status)
    }

    setOpen = (e: any) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            showMenu: !this.state.showMenu
        })
    }

    setOpenUser = (e: any) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            showMenuUser: !this.state.showMenuUser
        })
    }

    render() {
        let rows = this.props.allReimburse.map((e: Reimbursement) => {
            return <ReimburseDisplayRow reimbursement={e} key={'Reimbursement' + e.reimbursement_id} />
        })
        let rowUser = this.props.allReimburseUser.map((e: Reimbursement) => {
            return <ReimburseDisplayRow reimbursement={e} key={'Reimbursement' + e.reimbursement_id} />
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
                    <Form onSubmit={this.postReimburse}>
                        <FormGroup>
                            <Label for="reimburse_id" >Post a reimbursement</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reimburse_id" >Enter the next id of the reimbursement </Label>
                            <Input type="number" id="reimburse_id" value={this.state.reimburse_id} onChange={this.updateReimburse_id} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="amount" >Enter the amount you need reimbursed </Label>
                            <Input type="number" id="amount" value={this.state.amount} onChange={this.updateAmount} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description" >Describe why you need the reimbursement </Label>
                            <Input type="text" id="description" value={this.state.description} onChange={this.updateDescription} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Enter the type of reimbursement </Label>
                            <select id="type" onChange={this.updateType}required>
                                <option></option>
                                <option value="1" >Lodging</option>
                                <option value="2" >Travel</option>
                                <option value="3" >Food</option>
                                <option value="4" >Other</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Button>Post new reimbursement</Button>
                        </FormGroup>
                    </Form>
                    <div>
                        <button onClick={this.setOpen}>
                            Find reimbursement by status
                        </button>
                        {
                            this.state.showMenu
                                ? (<div className="menu">
                                    <button onClick={this.findReimburseByStatus} value={'Pending'}> Pending </button>
                                    <button onClick={this.findReimburseByStatus} value={'Approved'}> Approved </button>
                                    <button onClick={this.findReimburseByStatus} value={'Denied'}> Denied </button>
                                    {this.props.allReimburse.length !== 0 ?
                                    (<Table border="1" bordercolor='white'>
                                        <thead>
                                            <tr>
                                                <td>ID</td>
                                                <td>Author</td>
                                                <td>Amount</td>
                                                <td>Date Submitted</td>
                                                <td>Date Resolved</td>
                                                <td>Description</td>
                                                <td>Resolver</td>
                                                <td>Status</td>
                                                <td>Type</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </Table> ) : (
                                        null
                                    ) }
                                </div>) : (
                                    null
                                )
                        }
                    </div>

                    <div>
                        <button onClick={this.setOpenUser}>
                            Find reimbursement by User
                        </button>
                        {
                            this.state.showMenuUser
                                ? (<div className="menuUser">
                                    <Form onSubmit={this.findReimburseByUser}>
                                        <FormGroup>
                                            <Label for="rById">Enter the user id</Label>
                                            <Input type="text" id="rById" value={this.state.rById} onChange={this.updateRById} />
                                        </FormGroup>
                                        { this.props.allReimburseUser.length !== 0 ? (
                                        <Table border="1" bordercolor='white'>
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Author</td>
                                                    <td>Amount</td>
                                                    <td>Date Submitted</td>
                                                    <td>Date Resolved</td>
                                                    <td>Description</td>
                                                    <td>Resolver</td>
                                                    <td>Status</td>
                                                    <td>Type</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowUser}
                                            </tbody>
                                        </Table>) : (
                                            null
                                        )}
                                        <FormGroup>
                                            <Button>Find</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                                ) : (
                                    null
                                )
                        }
                    </div>
                    <div>
                        <Form onSubmit={this.updateReimburse}>
                            <FormGroup>
                                <Label for="reimburse_id">Update Reimbursement</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="reimburse_id">Enter the id of the reimbursement you would like to update</Label>
                                <Input type="text" id="reimburse_id" value={this.state.id} onChange={this.updateId} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Enter the new status of the reimbursement</Label>
                                <select id="status" onChange={this.updateStatus} required>
                                    <option></option>
                                    <option value="1">Pending</option>
                                    <option value="2">Approved</option>
                                    <option value="3">Denied</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Button>Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div> :
                <Redirect to='/login' />
        )
    }
}