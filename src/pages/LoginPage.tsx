import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="LoginBoard">
            <div className='LoginGreetingPanel'>
                <div className='LoginGreetingPanelText'>
                    <p className='medium'>Bienvenido!</p>
                    <p className='light'>Sistema CCP  v1.0</p>
                </div>
            </div>
            <div className='LoginForm'></div>
        </div>
    )
}
   
export default LoginPage;