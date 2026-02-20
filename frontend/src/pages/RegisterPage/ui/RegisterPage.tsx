/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Container } from "../../../components/Container";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import styles from "./RegisterPage.module.scss";
import { Button } from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../../../redux/investmentsApi";
import { emailRegex } from "../../../constants/constants";
import { createError } from "../../../helpers/createError";
import { Preloader } from "../../../components/Preloader";
import { PassField } from "../../../components/PassField";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userRegister, { isLoading, error }] = useUserRegisterMutation();
  const [errorMes, setErrorMes] = useState<string | null | undefined>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password && emailRegex.test(email)) {
      await userRegister({ email, username, password }).unwrap();
      navigate("/cabinet");
    }
  };

  const onFocusHandler = () => {
    if (!errorMes) return;

    setErrorMes(null);
  };

  useEffect(() => {
    if (!error) return;

    setErrorMes(createError(error));
  }, [error]);

  return (
    <Container>
      <div className={styles.formWrapper}>
        <Form title="Register" onSubmit={handleSubmit} error={errorMes}>
          <Input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onFocus={onFocusHandler}
            placeholder="Email"
            required
          />
          <Input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            onFocus={onFocusHandler}
            placeholder="Username"
          />
          <PassField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={onFocusHandler}
            placeholder="Password"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Preloader variant="white" /> : "Register"}
          </Button>
          <p>
            Already exists? <Link to="/Login">Login</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};
