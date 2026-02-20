/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Container } from "../../../components/Container";
import { useUserLoginMutation } from "../../../redux/investmentsApi";
import { Input } from "../../../components/Input";
import { Form } from "../../../components/Form";
import styles from "./LoginPage.module.scss";
import { Button } from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex } from "../../../constants/constants";
import { createError } from "../../../helpers/createError";
import { Preloader } from "../../../components/Preloader";
import { PassField } from "../../../components/PassField";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useUserLoginMutation();
  const navigate = useNavigate();
  const [errorMes, setErrorMes] = useState<string | null | undefined>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password && emailRegex.test(email)) {
      await loginUser({ email, password }).unwrap();
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
        <Form title="Login" onSubmit={handleSubmit} error={errorMes}>
          <Input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onFocus={onFocusHandler}
            placeholder="Email"
            required
          />
          <PassField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={onFocusHandler}
            placeholder="Password"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Preloader variant="white" className={styles.formLoader} />
            ) : (
              "Login"
            )}
          </Button>
          <p>
            Not registered yet? <Link to="/auth">Register</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};
