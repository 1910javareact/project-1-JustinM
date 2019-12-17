import React, { SyntheticEvent } from 'react'
import { Reimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { getUserById } from '../../remote/project1-clients/Project1User';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface IReimDisplayProps {
    user: User
    reimburse: Reimbursement
    rUpdate: (id: number, author: number, amount: number, submitted: number, resolved: number, description: string, resolver: number, status: number, type: number) => void;
}

interface IReimDisplayState {
    userById: User
    id: any
    author: any
    amount: any
    submitted: any
    resolved: any
    description: any
    resolver: any
    status: any
    type: any
    success: string
}

export class ReimDisplay extends React.Component<IReimDisplayProps, IReimDisplayState> {
    constructor(props: any) {
        super(props)
        this.state = {
            userById: new User(0, '', '', '', '', '', new Role(0, '')),
            id: '',
            author: '',
            amount: '',
            submitted: '',
            resolved: '',
            description: '',
            resolver: '',
            status: '',
            type: '',
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

    updateAuthor = (e: any) => {
        this.setState({
            ...this.state,
            author: e.target.value
        });
    }

    updateAmount = (e: any) => {
        this.setState({
            ...this.state,
            amount: e.target.value
        });
    }

    updateSubmitted = (e: any) => {
        this.setState({
            ...this.state,
            submitted: e.target.value
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
        e.preventDefault();
        this.props.rUpdate(this.state.id, this.state.userById.user_id, this.state.amount, this.state.submitted, this.state.resolved, this.state.description, this.state.resolver, this.state.status, this.state.type)
    }

    render() {
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
                        <Label for="submitted">Enter today's date</Label>
                        <Input type="text" id="submitted" value={this.state.submitted} onChange={this.updateSubmitted} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="resolved"></Label>
                        <Input type="text" id="resolved" value={this.state.resolved} onChange={this.updateResolved} />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}