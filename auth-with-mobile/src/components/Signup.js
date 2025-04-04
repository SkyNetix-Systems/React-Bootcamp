import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const FormWrapper = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const Message = styled.p`
    text-align: center;
    color: ${(props) => (props.success ? "green" : "red")};
    font-size: 14px;
`;

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Signup successful! 🎉");
            navigate("/home");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Sign Up</Title>
                <Form onSubmit={handleSignup}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Sign Up</Button>
                </Form>
                {message && <Message success={message.includes("successful")}>{message}</Message>}
            </FormWrapper>
        </Container>
    );
};

export default Signup;
