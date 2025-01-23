import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useNavigate, Navigate } from "react-router-dom";
const LoginPage = ({ user, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const checkUser = async (event) => {
        event.preventDefault()
        try {
            //api 호출 
            const response = await api.post('/user/login', { email, password })
            if (response.status === 200) {
                // user && 토큰저장
                // local(창닫아도 살아있음), session(창닫으면 죽음) 
                setUser(response.data.user)
                // console.log("유저", user)
                sessionStorage.setItem("token", response.data.token)
                // 토큰을 헤더에 저장
                api.defaults.headers["authorization"] = "Bearer " + response.data.token
                setError("")
                // todoPage 링크 
                navigate('/')
            }
            throw new Error(response.message)
        } catch (error) {
            setError(error.message)
        }
    }
    if (user) {
        return <Navigate to="/" />
    }
    return (
        <div className="display-center">
            {error && <div className="red-error">{error}</div>}
            <Form className="login-box" onSubmit={checkUser}>
                <h1>로그인</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <div className="button-box">
                    <Button type="submit" className="button-primary">
                        Login
                    </Button>
                    <span>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
