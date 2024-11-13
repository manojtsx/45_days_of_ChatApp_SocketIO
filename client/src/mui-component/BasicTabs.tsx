import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CustomTabPanelProps } from "@/interfaces/form-control";
import { A11yProps } from "@/interfaces/form-control";
import BasicFormControl from "./BasicFormControl";
import BasicButtons from "./BasicButtons";
import { UserInterface } from "@/interfaces/form-control";
import InputFileUpload from "./InputFileUpload";
import { toast } from "react-toastify";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number): A11yProps {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [loginUser, setLoginUser] = useState<UserInterface>({
    email: "",
    password: "",
  });
  const [registerUser, setRegisterUser] = useState<UserInterface>({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const postDetails = (pics: File) => {
    setLoading(true);
    if (pics === undefined) {
      toast.error("Please Select An Image");
      return;
    }
    if (pics.type == "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "drtkowwoc");
      fetch(IMAGE_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRegisterUser({ ...registerUser, pic: data.secure_url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    } else {
      toast.error("Please Select an Image");
      setLoading(false);
    }
  };

  const onRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterUser({ ...registerUser, [name]: value });
    console.log(registerUser);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const onLoginClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post("/api/user/login", loginUser, config);
      toast.success("Login successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const onGuestLoginClick = async () => {
    try {
      const guestUser = { email: "manoj@gmail.com", password: "123456" };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post("/api/user/login", guestUser, config);
      toast.success("Login successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const onRegisterClick = async () => {
    setLoading(true);
    if (registerUser.password !== registerUser.confirmPassword) {
      toast.warn("Passwords donot match.");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post(
        "/api/user/register",
        registerUser,
        config
      );
      toast.success("Registration successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          <div className="my-2">
            <BasicFormControl
              label="Email"
              placeholder="Enter your email"
              onChange={onChange}
              value={loginUser.email}
              name="email"
            />
          </div>
          <div className="my-2">
            <BasicFormControl
              label="Password"
              placeholder="Enter your password"
              onChange={onChange}
              value={loginUser.password}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-3">
            <BasicButtons text="Log In" onClick={onLoginClick} />
            <BasicButtons text="Login As Guest" onClick={onGuestLoginClick} />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <div className="my-2">
            <BasicFormControl
              label="Name"
              placeholder="Enter your name.."
              onChange={onRegisterChange}
              value={registerUser.name ? registerUser.name : ""}
              name="name"
            />
          </div>
          <div className="my-2">
            <BasicFormControl
              label="Email"
              placeholder="Enter your email.."
              onChange={onRegisterChange}
              value={registerUser.email ? registerUser.email : ""}
              name="email"
            />
          </div>
          <div className="my-2">
            <BasicFormControl
              label="Password"
              placeholder="Enter your password.."
              onChange={onRegisterChange}
              value={registerUser.password}
              name="password"
            />
          </div>

          <div className="my-2">
            <BasicFormControl
              label="Confirm Password"
              placeholder="Enter your password again.."
              onChange={onRegisterChange}
              value={
                registerUser.confirmPassword ? registerUser.confirmPassword : ""
              }
              name="confirmPassword"
            />
          </div>
          <div className="my-2">
            <InputFileUpload
              onChange={(event) => {
                if (event.target.files) {
                  postDetails(event.target.files[0]);
                }
              }}
            />
          </div>

          <BasicButtons
            text="Register"
            onClick={onRegisterClick}
            isLoading={loading}
          />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
