import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import axios from 'axios'
import Link from '@material-ui/core/Link'
import TopBar from '../components/TopBar/TopBar';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginAction = this.loginAction.bind(this);
    }

    loginAction = async () => {
        console.log(this.state)
        const { data } = await axios.post('/login', {email: this.state.email, password: this.state.password});
        localStorage.setItem('token', data.access_token);
        console.log(localStorage.getItem('token'));
        console.log(data)
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }
    
    render() {
        return(
            <div className="App">
                <TopBar/>
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                        <Link href="https://song-recommendation.herokuapp.com/api/login/spotify" style={{ textDecoration: 'none' }}>
                            <_Button useClassGreen={true} label='ZAREJESTRUJ SIĘ PRZEZ SPOTIFY' />
                        </Link>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail lub nazwa użytkownika" type="" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło" type="password" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                    <Link to="/event">
                        <span onClick={this.loginAction}>
                            <_Button useClassGreen={false} label='ZALOGUJ SIĘ'/>
                        </span>
                    </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Login;