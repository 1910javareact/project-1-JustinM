import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ReimDisplay } from "./ReimComponent";
import { rUpdate } from "../../action-mappers/reim-update-action-mapper"

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user:state.login.user,
        history:ownProps.history,
        match:ownProps.match,
        location:ownProps.location
    }
}

const mapDispatchToProps = {
    rUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimDisplay)