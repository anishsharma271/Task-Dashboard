import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Toastify } from "../../utility/toastify/toastContainer";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "./style.css"
import { signUpValidation } from "../../validation/authValidation";
import { signUp } from "../../store/auth/authSlice";


const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",

};

const schema = signUpValidation

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const {
        control,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });
    const token = localStorage.getItem("token");


    React.useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [navigate, token]);
    const onSubmit = (data) => {

        dispatch(signUp(data))
            .unwrap()
            .then((res) => {
                if (res.success === true) {
                    navigate("/")
                    Toastify({ data: "success", msg: res.message });

                }
            });
        reset();

    };
    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div className="py-5 sign-up-bg bg-light-red ">
            <div className="container d-flex  justify-content-center align-items-center">
                <div className="shadow-lg p-4 p-xl-5 rounded-4 bg-white w-75">

                    <h2 className="text-uppercase mb-3 text-center">  SignUp page</h2>

                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className={`form-row mb-3 col-md-12`}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                className={`form-control ${errors.name ? "error" : ""
                                                    }`}
                                                placeholder=" Name*"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={`form-row mb-3 col-md-12 `}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                className={`form-control width-input ${errors.email ? "error" : ""
                                                    }`}
                                                placeholder="Email address*"
                                            />
                                        )}
                                    />
                                </div>
                                <div className={`form-row mb-3 col-md-12 `}>
                                    <Controller
                                        name="age"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    {...field}
                                                    className={`form-control width-input ${errors.age ? "error" : ""
                                                        }`}
                                                    onKeyPress={(e) => {
                                                        const isValidInput = /^[0-9\b]+$/.test(e.key);
                                                        if (!isValidInput) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="age*"
                                                />
                                                {errors.age && <p className='text-white bg-black my-3 ps-2'>{errors.age.message}</p>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={`form-row mb-3 col-md-12 position-relative`}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control width-input ${errors.password ? "error" : ""
                                                        }`}
                                                    placeholder="Create Password*"
                                                />
                                                {errors.password && (
                                                    <p className="text-white bg-black my-3 py-2 ps-2">{errors.password.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        className="position-absolute top-0 end-0 mx-0 bg-transparent border-0 me-2"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </div>
                                <div className={`form-row mb-3 col-md-12 position-relative`}>
                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    {...field}
                                                    className={`form-control width-input ${errors.confirmPassword && (watch("password") !== watch("confirmPassword")) ? "error" : ""
                                                        }`}
                                                    placeholder="Confirm Password*"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                />
                                                {errors.confirmPassword && (watch("password") !== watch("confirmPassword")) && (
                                                    <p className="  text-white bg-black my-3 py-2 ps-2">{errors.confirmPassword.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        className="position-absolute top-0 end-0 mx-0 bg-transparent border-0 me-2"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </div>


                            </div>


                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-primary w-100">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
