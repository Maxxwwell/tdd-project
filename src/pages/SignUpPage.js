/* eslint-disable jsx-a11y/aria-role */
import axios from 'axios';
import React, { Component } from 'react'
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    apiProgress: false,
    nameError: "",
    emailError: "",
    passwordError: "",

}

class SignUpPage extends Component {
    state = initialState;

    onChangedUsername = (event) => {
        const currentValue = event.target.value;
        this.setState({
            username: currentValue,
        })
    }

    onChangedEmail = (event) => {
        const currentValue = event.target.value;
        this.setState({
            email: currentValue,
        })
    }

    onChangedPassword = (event) => {
        const currentValue = event.target.value;
        this.setState({
            password: currentValue,
        })
    }

    onChangedConfirmPassword = (event) => {
        const currentValue = event.target.value;
        this.setState({
            confirmPassword: currentValue,
        })
    };

    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";

        // username validation
        if (this.state.username < 3) {
            nameError = "please enter a valid username"
        }

        // email validation
        if (!this.state.email.includes("@" || ".com")) {
            emailError = 'please use a valid email address'
        }

        // password validation
        if (this.state.password.length < 5) {
            passwordError = "password must be at least 6 characters"
        }

        if (emailError || nameError || passwordError) {
            this.setState({ emailError, nameError, passwordError });
            return false;
        }
        return true;
    };

    submit = () => {
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);

            const { username, email, password } = this.state;
            const body = {
                username, email, password
            };
            this.setState({ apiProgress: true })
            axios.post("/api/1.0/users", body)
        }

    }

    render() {
        let disabled = true;
        const { password, confirmPassword, apiProgress } = this.state;
        if (password && confirmPassword) {
            disabled = password !== confirmPassword;
        }

        return (
            <SignUpContainer>

                <h1>Sign Up</h1>
                <input placeholder="username" onChange={this.onChangedUsername} />
                <ReturnMessage>{this.state.nameError}</ReturnMessage>

                <input placeholder="email" onChange={this.onChangedEmail} />
                <ReturnMessage>{this.state.emailError}</ReturnMessage>

                <input placeholder="password" type="password" onChange={this.onChangedPassword} />
                <ReturnMessage>{this.state.passwordError}</ReturnMessage>

                <input placeholder="confirm password" type="password" onChange={this.onChangedConfirmPassword} />

                <button disabled={disabled || apiProgress} onClick={this.submit}>
                    {apiProgress ? (
                        <div role="loading"><ReactLoading type="bubbles" color="black" height={20} width={30} /></div>)
                        : ("Sign Up")
                    }
                </button>

            </SignUpContainer>
        )
    }


}

export default SignUpPage

const SignUpContainer = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
    
    flex-direction: column;
    input {
        height: 35px;
        width: 23%;
        margin: 10px;
        border-radius: 5px;
        padding-left: 10px;
        border-color: lightgrey;
        &:hover {
            border-color: lightgreen;
        }
        
    }
    button {
            height: 40px;
            width: 100px;
            margin: 10px;
            background-color: lightcyan;
            border-radius: 5px;
        }

    div {
        align-items: center;
        justify-content: center;
        display: flex;
    }
`

const ReturnMessage = styled.div`
    color: red;
    font-size: 12px;
    padding-bottom: 10px;
   /* position: relative;
   left: 1px; */
`