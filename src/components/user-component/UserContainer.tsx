import { IState } from "../../reducers";
import { connect } from "react-redux";
import { UserDisplay } from "./UserComponent";
import { uUpdate } from "../../action-mappers/user-update-action"

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user:state.login.user,
        history:ownProps.history,
        match:ownProps.match,
        location:ownProps.location
    }
}

const mapDispatchToProps = {
    uUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDisplay)