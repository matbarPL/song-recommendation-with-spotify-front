import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field';
import _PField from '../components/Register/_PField';
import _Button from '../components/Register/_Button';
import TopBar from '../components/TopBar/TopBar';
import Link from '@material-ui/core/Link'
import axios from 'axios'
import { register } from '../utils/UserFunctions'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            username:'',
            passwordRepeat:'',
            registerErrorMessage: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.registerAction = this.registerAction.bind(this);
    }

    
    registerAction(e) {
        e.preventDefault()
        console.log(this.state);
        
        if(this.state.password != this.state.passwordRepeat){
            this.setState({registerErrorMessage:'Hasła nie są takie same!'});
        }
        else{
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('/register', {
                email: newUser.email,
                password: newUser.password,
                username: newUser.username
            }).then(res => {
                this.props.history.push(`/login`)
            }).catch(err => {
                if (err.response.data.message.email){
                    this.setState({
                        registerErrorMessage:'Niepoprawny email.'});
                }else{
                    const text = JSON.stringify(err.response.data.message);
                    this.setState({
                        registerErrorMessage: text.slice(1,2).toUpperCase() + text.slice(2, text.length)
                    });
                }
            })
        }
    }
    
    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }
    
    handleRepeatPasswordChange(event){
        this.setState({
            passwordRepeat: event.target.value
        })
    }

    render() {
        return(
            
            <div className="App">
                <TopBar/>
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                    </Grid>
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Link href="http://156.17.130.143/api/login/spotify" style={{ textDecoration: 'none' }}>
                            <_Button useClassGreen={true} label='ZAREJESTRUJ SIĘ PRZEZ SPOTIFY' />
                        </Link>
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'NunitoSans'
                        }}>
                            lub
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'NunitoSans'
                        }}>
                        Zarejestruj się przy użyciu swojego adresu e-mail.
                        </div>     
                    </Grid>
                    <Grid item>
                        <_Field label="Nazwa Użytkownika" onChange={this.handleUsernameChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_PField label="Hasło" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                        <_PField label="Powtórz hasło" onChange={this.handleRepeatPasswordChange}/>
                    </Grid>
                    <Grid item>
                        <p style={{color:"red"}} >{this.state.registerErrorMessage}</p>
                    </Grid>
                    <Grid item>
                        <span onClick={this.registerAction}>
                            <_Button useClassGreen={false} label='ZAREJESTRUJ SIĘ'  />
                        </span>            
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'NunitoSans'
                        }}>
                            Masz już konto?{" "}
                        </div>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FF0080',
                            fontFamily: 'NunitoSans',
                            fontWeight: 'Bold'
                        }}> 
                        <Link href="/login">
                             Zaloguj się.
                        </Link>
                        </div>     
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Register;