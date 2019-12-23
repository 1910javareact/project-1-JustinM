import React from 'react'
import { Reimbursement } from '../../models/reimbursement';

interface IReimburseDisplayRowProps {
    reimbursement: Reimbursement
}

export const ReimburseDisplayRow: React.FC<IReimburseDisplayRowProps> = (props) => {
    return (
        <tr>
            <td>{props.reimbursement.reimbursement_id}</td>
            <td>{props.reimbursement.author}</td>
            <td>{props.reimbursement.amount}</td>
            <td>{props.reimbursement.date_submitted}</td>
            <td>{props.reimbursement.date_resolved}</td>
            <td>{props.reimbursement.description}</td>
            <td>{props.reimbursement.resolver}</td>
            <td>{props.reimbursement.status}</td>
            <td>{props.reimbursement.type}</td>
        </tr>
    )
}