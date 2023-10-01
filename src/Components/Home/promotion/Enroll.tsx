import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { showErrorToast,showSuccessToast } from "../../Utils/tools";
import {promotionsCollection} from '../../../firebase'
import {  query, where ,getDocs, addDoc} from "firebase/firestore";



const Enroll = () =>{
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{email:''},
        validationSchema:Yup.object({
            email:Yup.string()
            .email('Invalid email')
            .required('The email is required')
        }),
        
        
        onSubmit:(values)=>{
            setLoading(true);
            submitForm(values.email)

        }
    })

    const submitForm = async(email:string) =>{
        try{
            console.log(email)
            const isOnTheList = await query(promotionsCollection, where("email", "==", email))

            const querySnapshot = await getDocs(isOnTheList);
            if(querySnapshot.docs.length>=1){
                showErrorToast("you are already on the list");
                setLoading(false)
                return false;
            }else{
                await addDoc(promotionsCollection,{email:email})
                formik.resetForm();
                showSuccessToast("Congratulations!!!");
                setLoading(false)
            }

            

            console.log("inside try catch")
            console.log(isOnTheList)
        }catch(error){
                console.log(error)
        }
    }

    return (
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Enter your email
                    </div>
                    <div className="enroll_input">
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="enter your email"
                        />
                        {formik.touched.email && formik.errors.email?
                        <div className="error_label">
                            {formik.errors.email}
                        </div>
                        :null}

                        {
                            loading?
                            <CircularProgress color="secondary" className="progress"/>
                            :
                            <button>
                                Enroll
                            </button>
                        }

                        <div className="enroll_disclaimer">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde ex facere aliquam.
                        </div>

                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Enroll;