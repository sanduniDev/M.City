import React  from 'react';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { auth } from '../../firebase';
// import { signOut } from "firebase/auth";


import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

type CityLogoProps = {
    link: boolean;
    linkTo: string;
    width: string;
    height: string;
};

export const CityLogo = ({ link, linkTo, width, height }: CityLogoProps) => {
    const template = <div
        className='img_cover'
        style={{
            width: width,
            height: height,
            background: `url(${mcitylogo}) no-repeat`
        }}
    ></div>

    if (link) {
        return (
            <Link className='link_logo' to={linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }
}

export const Tag = (props:any) => {
    const template =
        <div
            style={{
                background:props.bck?props.bck : '#ffffff',
                fontSize: props.size? props.size:'15px',
                color: props.color? props.color: '#000000',
                padding:'5px 10px',
                display:'inline-block',
                fontFamily:'Righteous',
                ...props.add
            }}
        >
            {props.children}
        </div>
    if(props.link){
        return(
            <Link to={props.linkto}>
                {template}
            </Link>
        )
    }else{
        return template
    }
}

// export const showErrorToast = (msg: string) => {
//     toast.error(msg, {
//         position: toast.POSITION.TOP_LEFT,
//     });
// }

// export const showSuccessToast = (msg: string) => {
//     toast.success(msg, {
//         position: toast.POSITION.TOP_LEFT,
//     });
// }

// export const logOutHandler = () => {
//     console.log("in the function")
//     signOut(auth).then(() => {
//         //alert('signed out');
//         showSuccessToast('successfully signed out');
//     }).catch((error) => {
//         // An error happened.
//         showErrorToast(error.message);
//         console.log(error)
//     });
// }