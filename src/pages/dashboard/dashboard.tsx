import {connect} from 'react-redux'

const DashboardPage = (props) => {
    return (
        <div>
            <p>Hello from Dashboard Page</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)