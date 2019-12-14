import { connect } from "react-redux"
import { Login } from "./Login"
import { IState } from "../../reducers"
import { uLogin } from '../../action-mappers/login-action-mapper'

const mapStateToProps = (state: IState) => {
    return {
        user: state.login.user
    }
}

const mapDispatchToProps = {
    uLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)