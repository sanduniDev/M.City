// 
import { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import FileUploader from "../../Utils/fileUploader";

import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams,useNavigate  } from 'react-router-dom';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
//import { playersCollection} from "../../../firebase";
import { playersCollection } from "../../../firebase";
import { DocumentData, addDoc, doc, getDoc, setDoc } from "firebase/firestore";


type valuesType = {
    name: string,
    lastname: string,
    position: string,
    number: string,
    image?: string
}
const defaultValues = {
    name: '',
    lastname: '',
    position: '',
    number: '',
    image:''
}

const AddEditPlayers = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState<valuesType | DocumentData >(defaultValues);
    const [imgUrl,setImgUrl] = useState('')
    const { playerid } = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('This input is required'),
            lastname: Yup.string()
                .required('This input is required'),
            number: Yup.number()
                .required('This input is required')
                .min(0, 'Te minimum is zero')
                .max(100, 'Te maximum is 100'),
            position: Yup.string()
                .required('This input is required'),
            image:Yup.string()
                 .required('image is required')
        }),
        onSubmit: (values) => {
            console.log("inside values")
            console.log(values)
            submitForm(values)
        },
    });

    const submitForm = (values: valuesType |DocumentData) => {
       
        let dataToSubmit = values;
        setLoading(true)

        if (formType === 'add') {
            addDoc(playersCollection, dataToSubmit).then(() => {
                showSuccessToast('Player added');
                formik.resetForm();
                
                navigate('/admin_players');
            }).catch(error => {
                showErrorToast(error)
            })
        } else {
            const param = playerid;
            const docRef = doc(playersCollection, param);
            setDoc(docRef,values).then(()=>{
                showSuccessToast("player Updated")
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })
        }
    }

    useEffect(() => {

        const param = playerid;


        if (param) {
            const docRef = doc(playersCollection, param);
            getDoc(docRef).then((snapshot) => {

                if (snapshot.data()) {
            
                    
                    setFormType('edit');
                    setValues(snapshot.data()!)
                } else {
                    showErrorToast("sorry nothing was found")
                }
            }).catch((error) => {
                showErrorToast(error)
            })

            
        } else {
            setFormType('add');
            setValues(defaultValues)

        }

    }, [playerid])

    const updateImageName = (fileUrl:string) =>{
        
        setImgUrl(fileUrl)
        
        
    }

    useEffect(()=>{
        
        formik.setFieldValue('image',imgUrl)
        
    },[imgUrl])

    

   

    return (
        <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit Player'} navigate={navigate}>
            <div className="editplayers_dialog_wrapper">
                <div>


                    <form onSubmit={formik.handleSubmit}>

                        <FormControl error={selectIsError(formik, 'image')}>
                            <FileUploader fileUrl={(fileUrl:string)=>updateImageName(fileUrl)}/>
                            {selectErrorHelper(formik, 'image')}
                        </FormControl>

                         <hr />
                        <h4>Player info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="name"
                                    variant="outlined"
                                    placeholder="Add firstname"
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik, 'name')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    variant="outlined"
                                    placeholder="Add lastname"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik, 'lastname')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    type="number"
                                    id="number"
                                    variant="outlined"
                                    placeholder="Add number"
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik, 'number')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik, 'position')}>
                                <Select
                                    id="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Select a position</MenuItem>
                                    <MenuItem value="Keeper">Keeper</MenuItem>
                                    <MenuItem value="Defence">Defence</MenuItem>
                                    <MenuItem value="MidFfield">Midfield</MenuItem>
                                    <MenuItem value="Striker">Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'position')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {formType == 'add' ? 'Add Player' : 'Edit Player'}
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditPlayers;