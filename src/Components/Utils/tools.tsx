import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

type CityLogoProps = {
    link: boolean;
    linkTo: string;
    width: string;
    height: string;
};

export const CityLogo = ( { width, height,  link, linkTo, }:CityLogoProps) => {
    const template = <div
        className="img_cover"
        style={{
            width: width,
            height: height,
            background:`url(${mcitylogo}) no-repeat`
        }}
    ></div>

    if(link){
        return (
            <Link className="link_logo" to={linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }

}

export const showErrorToast = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_LEFT,
    });
}

export const showSuccessToast = (msg: string) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_LEFT,
    });
}
export const logOutHandler = () => {
    console.log("in the function")
    signOut(auth).then(() => {
        //alert('signed out');
        showSuccessToast('successfully signed out');
    }).catch((error) => {
        // An error happened.
        showErrorToast(error.message);
        console.log(error)
    });
}
