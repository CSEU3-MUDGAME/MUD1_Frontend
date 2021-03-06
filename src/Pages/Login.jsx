import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "../utils/hooks";
import { login } from "../state/actions/user";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Login = ({ login, history, error }) => {
  const { onChange, onSubmit, values } = useForm(handleSubmit, {
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  let [localError, setLocalError] = useState({ ...error });

  async function handleSubmit() {
    setLoading(true);
    await login(values.username, values.password, history);
    setLoading(false);
  }

  useEffect(() => {
    setLocalError({ ...error });
  }, [error]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setLocalError({});
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [localError]);

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <div style={{ marginTop: "10px" }}>
          <Label>Username</Label>
          <br />
          <Input
            type="text"
            value={values.username}
            name="username"
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Label>Password</Label>
          <br />
          <Input
            type="password"
            value={values.password}
            name="password"
            onChange={onChange}
            required
          />
        </div>
        <Button
          type="submit"
          value={loading ? "Loading..." : "Login"}
          disabled={loading}
        />
      </Form>
      {Object.keys(localError).length > 0 && (
        <Error>Something went wrong. Try Again.</Error>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  margin: 20px auto;
  width: 80%;
`;

const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: white;
  font-weight: bold;
`;
const Input = styled.input`
  width: 100%;
  border: 2px solid grey;
  height: 40px;
  border-radius: 10px;
  background-color: #333;
  margin-top: 10px;
  color: white;
  padding: 10px;
`;

const Button = styled.input`
  width: 100%;
  height: 40px;
  background-color: #6df7b1;
  font-family: "Oxanium", cursive;
  font-size: 20px;
  color: #333;
  border: none;
  cursor: pointer;
  margin-top: 50px;
  border-radius: 10px;
  transition: 0.5s opacity ease-in-out;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`;

const Error = styled.p`
  color: red;
  font-family: "Oxanium", cursive;
`;
export default withRouter(connect(state => state.user, { login })(Login));
