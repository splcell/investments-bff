/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container } from "../../../components/Container";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import styles from "./SettingsPage.module.scss";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { PassField } from "../../../components/PassField";
import { Remove } from "../../../assets/icons/Remove";
import {
  useUserDeleteMutation,
  useUserUpdateMutation,
} from "../../../redux/investmentsApi";

export const SettingsPage = () => {
  //@ts-ignore
  const { data } = useOutletContext();
  const [email, setEmail] = useState(data.email || "");
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [username, setUsername] = useState(data.username || "");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userDeleteError, setUserDeleteError] = useState<string | null>(null);
  const [updateUser] = useUserUpdateMutation();
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useUserDeleteMutation();
  const navigate = useNavigate();

  const deleteUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmUsername !== data.username) {
      setUserDeleteError("Confirm field is required");
      return;
    }

    try {
      await deleteUser(data.id).unwrap();
      navigate("/");
    } catch (error) {
      setUserDeleteError(error as string);
    }
  };

  const onFocusErrorChange = () => {
    setError(null)
  }

  const onFocusDeleteErrorChange = () => {
    setUserDeleteError(null)
  }

  const updateSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!email){
      setError("Email is required")
      return
    }

    if(!username){
      setError("Username is required")
      return
    }

    if(!password){
      await updateUser({id: data.id, email, username})
    }

    if(password && newPass && password === newPass){
      await updateUser({id: data.id, email, username, password})
    }

    if(password && newPass && password !== newPass){
      setError("Passwords don't match")
      return
    }
  }

  return (
    <Container>
      <div className={styles.settingsWrapper}>
        <Form title="User Settings" error={error} onSubmit={updateSubmitHandler}>
          <div>
            <label htmlFor="email">Change email</label>
            <Input
              value={email}
              id="email"
              onFocus={onFocusErrorChange}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Change email"
            />
          </div>
          <div>
            <label htmlFor="username">Change username</label>
            <Input
              value={username}
              id="username"
              onFocus={onFocusErrorChange}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Change username"
            />
          </div>
          <div>
            <label htmlFor="password">Change password</label>
            <PassField
              value={password}
              onFocus={onFocusErrorChange}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Old password"
            />
            <PassField
              value={newPass}
              onFocus={onFocusErrorChange}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="New password"
            />
          </div>
          <Button variant="black">Confirm</Button>
        </Form>
        <Form
          title="Danger zone"
          onSubmit={deleteUserHandler}
          error={userDeleteError}
        >
          <div>
            <span>To confirm your account deletion, enter your username</span>
            <Input
              value={confirmUsername}
              onFocus={onFocusDeleteErrorChange}
              onChange={(e) => setConfirmUsername(e.target.value)}
            />
          </div>
          <Button variant="red">
            <Remove />
            Delete account
          </Button>
        </Form>
      </div>
    </Container>
  );
};
