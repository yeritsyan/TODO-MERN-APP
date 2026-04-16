import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//components imports
import Button from "../common/Button";
import Input from "../common/Input";

//types imports
import { User, UserState } from "../../types/user";

//context imports
import AuthContext from "../../context/auth/AuthContext";

const Signup = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [registering, setRegistering] = useState(false);

  const { isRegistered, error, clearError, signup } =
    useContext<UserState>(AuthContext);

  const checkValid = () => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.username === ""
    ) {
      toast.error("Please fill all the fields", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing Up...", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
    if (!checkValid()) {
      toast.dismiss(loadingToast);
      return;
    }

    setRegistering(true);
    try {
      signup &&
        (await signup({
          email: user.email,
          password: user.password,
          username: user.username,
        }));

      if (!error) {
        toast.success("Signed Up Successfully", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        console.log("success", error);
        toast.dismiss(loadingToast);
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }

    // if (error) {
    //   console.log('error', error);
    //   toast.dismiss(loadingToast);
    //   toast.error(`${error} <- from signup` || 'Some error occurred', {
    //     style: {
    //       background: '#333',
    //       color: '#fff',
    //     },
    //   });
    // } else {
    //   toast.success('Signed Up Successfully', {
    //     style: {
    //       background: '#333',
    //       color: '#fff',
    //     },
    //   });
    //   console.log('success', error);
    //   toast.dismiss(loadingToast);
    //   navigate('/');
    // }
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/");
    }
  }, [isRegistered, path]);

  useEffect(() => {
    if (error) {
      setRegistering(false);
      toast.error(error, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      clearError && clearError();
    }
  }, [error]);

  return (
    <>
      <div className="auth-page">
        <div>
          <h2>Sign UP to save your TODOs</h2>
        </div>

        <div className="auth-card">
          <div className="flex flex-col gap-6">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  variant="dark"
                  onChange={onInputChangeHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="dark"
                  autoComplete="email"
                  onChange={onInputChangeHandler}
                />
              </div>
              <p className="hint-text">
                Only accepting Gmail, Yahoo and Outlook emails
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="dark"
                  autoComplete="current-password"
                  onChange={onInputChangeHandler}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  variant="dark"
                  autoComplete="current-password"
                  onChange={onInputChangeHandler}
                />
              </div>
            </div>

            <div>
              <Button
                text={registering ? "Signin Up.." : "Sign Up"}
                variant="success"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Signup;
