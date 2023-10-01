import React, { useEffect, useState } from 'react';
import { playersCollection } from '../../../firebase';
import { collection, addDoc, getDoc, setDoc, DocumentData, doc } from 'firebase/firestore';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from '../../Utils/tools';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import FileUploader from '../../Utils/fileUploader';

type ValuesType = {
  name: string;
  lastname: string;
  position: string;
  number: string;
  image?: string;
};

const defaultValues: ValuesType = {
  name: '',
  lastname: '',
  position: '',
  number: '',
  image: '',
};

const AddEditPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('');
  const [values, setValues] = useState<ValuesType>(defaultValues);
  const { playerid } = useParams<{ playerid?: string }>();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
        name: Yup.string().required('This input is required'),
        lastname: Yup.string().required('This input is required'),
        number: Yup.number()
          .required('This input is required')
          .min(0, 'The minimum is zero')
          .max(100, 'The maximum is 100'),
        position: Yup.string().required('This input is required'),
        image: Yup.string().required('Image is required'),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

 


const submitForm = (values: ValuesType) => {
  let dataToSubmit = values;
  setLoading(true);

  if (formType === 'add') {
    addDoc(playersCollection, dataToSubmit)
      .then(() => {
        showSuccessToast('Player added');
        formik.resetForm();
        navigate('/admin_players'); 
      })
      .catch((error: { message: string }) => {
        showErrorToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    const docRef = doc(playersCollection, playerid!);
    setDoc(docRef, values)
      .then(() => {
        showSuccessToast('Player updated');
      })
      .catch((error) => {
        showErrorToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
};


  useEffect(() => {
    if (playerid) {
        const docRef = doc(playersCollection, playerid);
        getDoc(docRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFormType('edit');
              setValues(snapshot.data() as ValuesType);
            } else {
              showErrorToast('Sorry, nothing was found');
            }
          })
          .catch((error) => {
            showErrorToast(error.message);
          });
      } else {
        setFormType('add');
        setValues(defaultValues);
      }
    }, [playerid]);

  return (
<AdminLayout title={formType === 'add' ? 'Add Player' : 'Edit Player'} navigate={navigate}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FileUploader fileUrl={(fileUrl: any) => formik.setFieldValue('image', fileUrl)} />
            </FormControl>

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
                <Select id="position" variant="outlined" displayEmpty {...formik.getFieldProps('position')}>
                  <MenuItem value="" disabled>
                    Select a position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="MidField">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {selectErrorHelper(formik, 'position')}
              </FormControl>
            </div>

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {formType === 'add' ? 'Add Player' : 'Edit Player'}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  
  );
};


export default AddEditPlayers;
