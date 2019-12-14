import React from 'react';

interface IUserState {
    user: string;
}
export class UserComponent extends React.Component<any, IUserState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: 'User information placeholder'
        };
    }

    // getUserInfo = async () => {
    //     const user = await getUser();
    //     this.setState({
    //         ...this.state,
    //         user
    //     });
    // }

    // async componentDidMount() {
    //     await this.getUserInfo();
    // }
    // render() {
    //     return (
    //         <div>
    //             <h1>You are logged in as:</h1>
    //             <h2>{this.state.user}</h2>
    //         </div>
    //     );
    // }
}