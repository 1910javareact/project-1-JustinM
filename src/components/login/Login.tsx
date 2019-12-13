import React, { SyntheticEvent } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { project1Login } from '../../remote/Project1User';

export class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    updateUsername = (e: any) => {
        this.setState({
            ...this.state,
            username: e.target.value
        });
    }

    updatePassword = (e: any) => {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    }

    submitLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const user = await project1Login(this.state.username, this.state.password);
        this.setState({
            ...this.state,
            user
        });
    }
    render() {
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup onSubmit={this.submitLogin}>
                                <Label for='exampleUsername'>Username</Label>
                                <Input value={this.state.username} onChange={this.updateUsername} type='text' name='username' id='exampleUsername' placeholder='Enter username' />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='examplePassword'>Password</Label>
                                <Input value={this.state.password} onChange={this.updatePassword} type='password' name='password' id='examplePassword' placeholder='Enter password' />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button>Sign in</Button>
                </Form>
            </div>
        );
    }
}