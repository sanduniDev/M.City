import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { FormHelperText } from '@mui/material';

interface CityLogoProps {
  link: boolean;
  linkTo?: string; 
  width: string;
  height: string;
}

export const CityLogo: React.FC<CityLogoProps> = ({ width, height, link, linkTo }) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width,
        height,
        background: `url(${CityLogo}) no-repeat`,
      }}
    ></div>
  );

  if (link && linkTo) {
    return <Link className="link_logo" to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
}

export interface TagProps {
  children: ReactNode;
  bck?: string;
  size?: string;
  color?: string;
  add?: React.CSSProperties;
  link?: boolean;
  linkto?: string; 
}

export const Tag: React.FC<TagProps> = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : '#ffffff',
        fontSize: props.size ? props.size : '15px',
        color: props.color ? props.color : '#000000',
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link && props.linkto) {
    return <Link to={props.linkto}>{template}</Link>;
  } else {
    return template;
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
  console.log('in the function');
  signOut(auth)
    .then(() => {
      showSuccessToast('successfully signed out');
    })
    .catch((error) => {
      showErrorToast(error.message);
      console.log(error);
    });
}
export const textErrorHelper = (formik:any, values:string) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values]:null
})

export const selectErrorHelper = (formik:any, values:string) => {
  if(formik.errors[values] && formik.touched[values]){
      return (<FormHelperText>{formik.errors[values]}</FormHelperText>)
  }
  return false
}

export const selectIsError = (formik:any, values:string) =>{
  return formik.errors[values] && formik.touched[values]
}