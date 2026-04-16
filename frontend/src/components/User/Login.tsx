import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//components imports
import Button from "../common/Button";
import Input from "../common/Input";

//types imports
import { User, UserState } from "../../types/user";

//context imports
import AuthContext from "../../context/auth/AuthContext";

const Login = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(false);

  const { isAuthenticated, error, clearError, signin } =
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

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging In...", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });

    if (!checkValid() || !signin) {
      toast.dismiss(loadingToast);
      return;
    }

    try {
      setLogin(true);
      await signin(user);
      if (!error) {
        toast.success("Logged in Successfully", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
      toast.dismiss(loadingToast);
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, path]);

  useEffect(() => {
    if (error) {
      setLogin(false);
      toast.error(error, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      if (clearError) {
        clearError();
      }
    }
  }, [error]);

  return (
    <>
      <div className="auth-page">
        <div>
          <h2>Sign in to save your TODOs</h2>
        </div>

        <div className="auth-card">
          <div className="flex flex-col gap-6">
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

            <div>
              <Button
                text={login ? "Signing In.." : "Sign In"}
                onClick={handleSubmit}
                variant="success"
              />
            </div>

            <div>
              <Link to="/user/signup" className="auth-link">
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
