import { IState } from "../../reducers";
import { connect } from "react-redux";
import { UserDisplay } from "./UserDisplay";

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user:state.login.user,
        history:ownProps.history,
        match:ownProps.match,
        location:ownProps.location
    }
}

export default connect(mapStateToProps)(UserDisplay)