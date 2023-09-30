import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../../firebase";

import { CircularProgress } from '@mui/material';
import { Navigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast} from "../Utils/tools";

const SignIn = (props: any) => {
    
    const [loading, setLoading] = useState(false)

    console.log("signinprops")
    console.log(props)

    const formik = useFormik({
        initialValues: {
            email: 'sanduni@gmail.com',
            password: 'sadu123'
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('invalid email address')
                .required('email is required'),
            password: Yup.string()
                .required('password is required')
        }),
        onSubmit: (values) => {
            setLoading(true);
            console.log(values);
            submitForm(values);
        }
    });

    const submitForm = (values: any) => {
        signInWithEmailAndPassword(auth, values.email, values.password) 
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
                showSuccessToast('Welcome back');
                //Navigate('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                showErrorToast(error.message);
            });
    }
 
    return (
        <>
        {!props.user ?
        <div className="container">
            <div className="signin_wrapper" style={{ margin: '100px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please login</h2>
                    <input
                        name="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email ?
                        <div className="error_label">
                            {formik.errors.email}
                        </div> : null
                    }
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    {formik.touched.password && formik.errors.password ?
                        <div className="error_label">
                            {formik.errors.password}
                        </div> : null
                    }

                    {loading ?
                        <CircularProgress color="secondary" className="progress" />
                        :
                        <button type="submit" >Login</button>
                    }
                </form>
            </div>
        </div>
        :
        <Navigate to={'/dashboard'} />
        }
        </>
    )
}

export default SignIn;
