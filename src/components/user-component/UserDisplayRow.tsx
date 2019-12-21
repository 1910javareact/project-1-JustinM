import React from 'react'
import { User } from '../../models/user';

interface IUserDisplayRowProps {
    user: User
}

export const UserDisplayRow: React.FC<IUserDisplayRowProps> = (props) => {
    return (
        <tr>
            <td>{props.user.username}</td>
            <td>{props.user.first_name}</td>
            <td>{props.user.last_name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.role.role}</td>
        </tr>
    )
}