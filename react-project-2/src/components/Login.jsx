import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { isAuth } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const fireBaseLogin = async () => {
    await login(emailRef.current.value, passwordRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    fireBaseLogin().then(() => {
      navigate("/");
    });
    setLoading(false);
  };
  useEffect(() => {
    isAuth && navigate("/");
    return () => {};
  }, []);

  return (
    <>
      <Card className="tweet-login-form">
        <Card.Body>
          <h1 className="text-center mb-4 h1-login">Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
            <Button
              className="login-with-google-btn w-100 mt-3"
              disabled={loading}
              onClick={signInWithGoogle}
            >
              Login in with Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
};
export default Login;
