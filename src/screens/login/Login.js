import React, { Component } from 'react';
import Header from "../../common/Header.js"
import "./Login.css"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            incorrectUsernamePassword: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        };
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    navigateToHome = () => {
        this.props.history.push('/home');
    }

    //Handler called when login button is clicked. The token mentioned below is added to the session storage
    loginClickHandler = () => {
        //Change user/token if required here
        let user = "user",
            pass = "user",
            accessToken = "IGQVJVdmJOcllUbmdSLW41cXoyYVlHVmFtVVFPd255RWpDNE0tbFJvRFVVMGtWQ3pGWVlzV0NfZA0xHNjRzNmU4RURfckFDSEZA0Q1FSMlRmWjZATdmN3VS1BQUZAzeEhPOEhMX3hfSXQxTkJrbmJsUDRfcXVVZAHlwekdTc1FR"

        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username === "" || this.state.password === "") { return }

        if (this.state.username === user && this.state.password === pass) {
            sessionStorage.setItem('username', user);
            sessionStorage.setItem('access-token', accessToken);
            this.setState({ loggedIn: true });
            this.navigateToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }


    render() {
        return (
            <div className="main-container">
                <Header />
                <Card className="card-container">
                    <CardContent>
                        <Typography style={{ fontSize: 20 }}> LOGIN </Typography><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="error">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="error">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <div className={this.state.incorrectUsernamePassword}><span className="error"> Incorrect username and/or password </span></div><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}> LOGIN </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;