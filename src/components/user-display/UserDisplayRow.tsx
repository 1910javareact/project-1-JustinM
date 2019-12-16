import React from 'react'
import { User } from '../../models/user';

interface IUserDisplayRowProps {
    user: User
}

export const UserDisplayRow: React.FC<IUserDisplayRowProps> = (props) => {
    return (
        <div>
            <p>{props.user.username}</p>
            <p>{props.user.first_name}</p>
            <p>{props.user.last_name}</p>
            <p>{props.user.email}</p>
            {/* <p>{props.user.role}</p> */}
        </div>
    )
}