import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ForgotPassword = () => {
  const { isAuth } = useContext(UserContext);
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };
  useEffect(() => {
    isAuth && navigate("/");
    return () => {};
  }, []);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4 h1-login">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
};
export default ForgotPassword;
