import {connect} from 'react-redux'

interface DashboardPageProps {

}

interface DashboardPageState {

}

const DashboardPage = (props: DashboardPageProps) => {
    return (
        <div>
            <p>Hello from Dashboard Page</p>
        </div>
    )
}

const mapStateToProps = (state: DashboardPageState) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)