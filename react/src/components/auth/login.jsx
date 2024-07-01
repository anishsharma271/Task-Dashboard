import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../../validation/authValidation";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/auth/authSlice";
import { Toastify } from "../../utility/toastify/toastContainer";
import "./style.css"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
const schema = loginValidation;

const defaultValues = {
    email: "",
    password: "",
};
const Login = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [navigate, token]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (values) => {
        console.log("values", values);
        dispatch(signIn(values)).unwrap().then((res) => {
            console.log("res", res);
            if (res.success === true) {
                navigate("/home")
                Toastify({ data: "success", msg: res.message });
            }
        })
        reset();
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => { setShowPassword((show) => !show) };

    return (
        <div className='py-5 bg-light-red min-height-login'>
            <div className="container ">
                <div className='shadow-lg bg-white rounded-4 text-center mw-560px mx-auto w-50'>
                    <div className="form-container">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-4 py-5 bg-white mw-560px w-100 rounded-4 text-center"
                        >
                            <h6 className="contact-us-text text-uppercase underline-red fs-5 fw-bold text-center">
                                <span>Welcome back</span>
                            </h6>
                            <h2 className="h2-tag text-uppercase mb-3">
                                <VpnKeyIcon />
                            </h2>
                            <div className="form-row">
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="email"
                                            placeholder="Enter your email address"
                                            className={`form-control ${errors.email ? "error" : ""}`}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-row position-relative">
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Enter your password"
                                            className={`form-control ${errors.password ? "error" : ""}`}
                                        />
                                    )}
                                />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    className="position-absolute top-0 end-0 mx-0 bg-transparent border-0"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                {errors.password && (
                                    <div className="text-white bg-black my-3">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                            <p>Do not have an account ? <Link to='/signUp'>Sign-Up</Link> </p>
                            <button className="sub-button btn btn-primary w-100" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
