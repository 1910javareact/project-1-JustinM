import React, { SyntheticEvent } from 'react'
import { Reimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById } from '../../remote/project1-clients/Project1User';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { ReimburseDisplayRow } from './ReimburseDisplayRow';

interface IReimDisplayProps {
    user: User
    reimburse: Reimbursement
    rUpdate: (id: number, author: number, amount: number, submitted: string, resolved: string, description: string, resolver: number, status: number, type: number) => void;
    rFindByStatus: (status: number) => void
}

export class ReimDisplay extends React.Component<IReimDisplayProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            userById: new User(0, '', '', '', '', '', new Role(0, '')),
            allReimburse: [],
            id: '',
            //author: '',
            amount: '',
            submitted: '',
            resolved: '',
            description: '',
            resolver: '',
            status: '',
            type: '',
            success: '',
            showMenu: false
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
            }
        } catch (e) {
            console.log(e);
        }
    }

    updateAmount = (e: any) => {
        this.setState({
            ...this.state,
            amount: e.target.value
        });
    }

    updateResolved = (e: any) => {
        this.setState({
            ...this.state,
            resolved: e.target.value
        });
    }

    updateDescription = (e: any) => {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    updateResolver = (e: any) => {
        this.setState({
            ...this.state,
            resolver: e.target.value
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

    postReimburse = async (e: SyntheticEvent) => {
        let today = new Date();
        e.preventDefault();
        this.props.rUpdate(this.state.id, this.state.userById.user_id, this.state.amount, `${today.getFullYear()}-${today.getDate()}-${today.getMonth()}`, '', this.state.description, 0, 0, this.state.type)
    }

    findReimburseByStatus = async (e: any) => {
        let r;
        e.preventDefault();
        if (e.target.value === 'Pending') {
            r = this.props.rFindByStatus(1)
        }
        if (e.target.value === 'Approved') {
            r = this.props.rFindByStatus(2)
        }
        if (e.target.value === 'Denied') {
            r = this.props.rFindByStatus(3)
        }
    }

    setOpen = (e: any) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            showMenu: !this.state.showMenu
        })
    }

    render() {
        let rows = this.state.allReimburse.map((e) => {
            return <ReimburseDisplayRow reimbursement={e} key={'Reimbursement' + e.reimbursement_id} />
        })
        return (
            <div>
                <h1>You are logged in as:</h1>
                <p>{this.state.userById.username}</p>
                <p>{this.state.userById.first_name}</p>
                <p>{this.state.userById.last_name}</p>
                <p>{this.state.userById.email}</p>
                <p>{JSON.stringify(this.state.userById.role)}</p>
                <Form onSubmit={this.postReimburse}>
                    <FormGroup>
                        <Label for="author">Post a reimbursement</Label>
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="author">Enter your user name</Label>
                        <Input type="text" id="author" value={this.state.author} onChange={this.updateAuthor} />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="amount">Enter the amount you need reimbursed</Label>
                        <Input type="text" id="amount" value={this.state.amount} onChange={this.updateAmount} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Describe why you need the reimbursement</Label>
                        <Input type="text" id="description" value={this.state.description} onChange={this.updateDescription} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Enter the type of reimbursement</Label>
                        <Input type="text" id="type" value={this.state.type} onChange={this.updateType} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Post new reimbursement</Button>
                    </FormGroup>
                </Form>
                    <button onClick={this.setOpen}>
                        Find reimbursement by status
                        </button>
                        {
                    this.state.showMenu
                        ? (<div className="menu">
                        <button onClick={this.findReimburseByStatus} value={'Pending'}> Pending </button>
                        <button onClick={this.findReimburseByStatus} value={'Approved'}> Approved </button>
                        <button onClick={this.findReimburseByStatus} value={'Denied'}> Denied </button>
                    </div>) : (
                                  null
                              )
                    }
                    <Table border="1" bordercolor='white'>
                        <thead>
                            <tr>
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
                    </Table>
            </div>
        )
    }
}