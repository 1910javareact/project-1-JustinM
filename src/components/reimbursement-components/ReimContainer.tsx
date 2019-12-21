import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ReimDisplay } from "./ReimComponent";
import { rPost, rFindByStatus, rFindByUser, rUpdateReimburse } from "../../action-mappers/reim-update-action-mapper"

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user: state.login.user,
        history: ownProps.history,
        match: ownProps.match,
        location: ownProps.location,

        allReimburse: state.reimburse.allReimburse,
        allReimburseUser: state.reimburse.allReimburseUser,

        userById: state.reimburse.userById,
        id: state.reimburse.id,
        amount: state.reimburse.amount,
        submitted: state.reimburse.submitted,
        resolved: state.reimburse.resolved,
        description: state.reimburse.description,
        resolver: state.reimburse.resolver,
        status: state.reimburse.status,
        type: state.reimburse.type,
        rById: state.reimburse.rById,

        success: state.reimburse.success,
        showMenu: state.reimburse.showMenu,
        showMenuType: state.reimburse.showMenuType
    }
}

const mapDispatchToProps = {
    rPost,
    rFindByStatus,
    rFindByUser,
    rUpdateReimburse
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimDisplay)