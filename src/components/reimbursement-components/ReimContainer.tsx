import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ReimDisplay } from "./ReimComponent";
import { rUpdate, rFindByStatus } from "../../action-mappers/reim-update-action-mapper"

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user: state.login.user,
        history: ownProps.history,
        match: ownProps.match,
        location: ownProps.location,
        allReimburse: state.reimburse.allReimburse,
        userById: state.reimburse.userById,
        id: state.reimburse.id,
        amount: state.reimburse.amount,
        submitted: state.reimburse.submitted,
        resolved: state.reimburse.resolved,
        description: state.reimburse.description,
        resolver: state.reimburse.resolver,
        status: state.reimburse.status,
        type: state.reimburse.type,
        success: state.reimburse.success,
        showMenu: state.reimburse.showMenu
    }
}

const mapDispatchToProps = {
    rUpdate,
    rFindByStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimDisplay)