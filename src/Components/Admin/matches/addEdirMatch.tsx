import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useParams } from 'react-router-dom';
import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { matchesCollection, teamsCollection } from '../../../firebase';
import { DocumentData, addDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";

type valueTypes = {
  date: string;
  local: string;
  resultLocal: number;
  away: string;
  resultAway: number;
  referee: string;
  stadium: string;
  result: string;
  final: string;
  localThmb?: string;
  awayThmb?: string;
};

interface AdminLayoutProps {
    navigate: NavigateFunction;
  }

const defaultValues = {
  date: '',
  local: '',
  resultLocal: '',
  away: '',
  resultAway: '',
  referee: '',
  stadium: '',
  result: '',
  final: '',
};

const AddEditMatch = () => {

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState<DocumentData[]>();
    const [values, setValues] = useState<any>(defaultValues);  
    const { matchid } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string()
                .required('This input is required'),
            local: Yup.string()
                .required('This input is required'),
            resultLocal: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is zero')
                .max(99, 'The maximum is 99'),
            away: Yup.string()
                .required('This input is required'),
            resultAway: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is zero')
                .max(99, 'The maximum is 99'),
            referee: Yup.string()
                .required('This input is required'),
            stadium: Yup.string()
                .required('This input is required'),
            result: Yup.mixed()
                .required('This input is required')
                .oneOf(['W', 'D', 'L', 'n/a']),
            final: Yup.mixed()
                .required('This input is required')
                .oneOf(['Yes', 'No'])
        }),
        onSubmit: (values) => {
            submitForm(values)
        }
    })

    const submitForm = (values:valueTypes) =>{
        let dataToSubmit = values; 
        if(teams){
            teams.forEach(team=>{
                if(team.shortName===dataToSubmit.local){
                    dataToSubmit['localThmb'] = team.thmb
                }
                if(team.shortName===dataToSubmit.away){
                    dataToSubmit['awayThmb'] = team.thmb
                }
            })
        }

        setLoading(true);

        if (formType === 'add') {
            addDoc(matchesCollection, dataToSubmit).then(() => {
                showSuccessToast('Match added');
                formik.resetForm();
            }).catch(error => {
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })
        } else {
            const param = matchid;
            const docRef = doc(matchesCollection, param);
            console.log(docRef);

            setDoc(docRef,dataToSubmit).then(()=>{
                showSuccessToast("Match Updated")
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        if (!teams) {
            getDocs(teamsCollection).then(snapshot => {
                const teams = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTeams(teams);
            }).catch(error => {
                showErrorToast(error)
            })

        }
    }, [teams])

    useEffect(() => {
        const param = matchid;
        if (param) {
            const docRef = doc(matchesCollection, param);
            getDoc(docRef).then((snapshot) => {

                if (snapshot.data()) {

                    setFormType('edit');
                    setValues(snapshot.data())
                } else {
                    showErrorToast("sorry nothing was found")
                }
            }).catch((error) => {
                showErrorToast(error)
            })

        } else {
            setFormType('add')
            setValues(defaultValues)
        }

    }, [matchid])

    const showTeams = () => (
        teams ?
            teams.map((item: any) => (
                <MenuItem key={item.id} value={item.shortName} >
                    {item.shortName}
                </MenuItem>
            ))
            : null
    )


    return (
        <AdminLayout navigate={navigate as AdminLayoutProps['navigate']} title={formType === 'add' ? 'Add match' : 'Edit match'}>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>Select date</h4>
                            <FormControl>
                                <TextField
                                    id="date"
                                    type="date"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik, 'date')}
                                />
                            </FormControl>

                            <hr />

                            <div>
                                <h4>Result local</h4>
                                <FormControl error={selectIsError(formik, 'local')}>
                                    <Select
                                        id="local"
                                        variant='outlined'
                                        displayEmpty
                                        {...formik.getFieldProps('local')}
                                    >
                                        <MenuItem value="" disabled>Select a team</MenuItem>
                                        {showTeams()}
                                    </Select>
                                    {selectErrorHelper(formik, 'local')}
                                </FormControl>

                                <FormControl
                                    style={{ marginLeft: '10px' }}
                                >
                                    <TextField
                                        id="resultLocal"
                                        type="number"
                                        variant='outlined'
                                        {...formik.getFieldProps('resultLocal')}
                                        {...textErrorHelper(formik, 'resultLocal')}
                                    />
                                </FormControl>

                            </div>

                            <div>
                                <h4>Result Away</h4>
                                <FormControl error={selectIsError(formik, 'away')}>
                                    <Select
                                        id="away"
                                        variant='outlined'
                                        displayEmpty
                                        {...formik.getFieldProps('away')}
                                    >
                                        <MenuItem value="" disabled>Select a team</MenuItem>
                                        {showTeams()}
                                    </Select>
                                    {selectErrorHelper(formik, 'away')}
                                </FormControl>

                                <FormControl
                                    style={{ marginLeft: '10px' }}
                                >
                                    <TextField
                                        id="resultAway"
                                        type="number"
                                        variant='outlined'
                                        {...formik.getFieldProps('resultAway')}
                                        {...textErrorHelper(formik, 'resultAway')}
                                    />
                                </FormControl>

                            </div>

                        </div>

                        <hr />
                        <h4>Match Info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="referee"
                                    variant='outlined'
                                    placeholder='Add a referee name'
                                    {...formik.getFieldProps('referee')}
                                    {...textErrorHelper(formik, 'referee')}
                                />
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="stadium"
                                    variant='outlined'
                                    placeholder='Add a stadium name'
                                    {...formik.getFieldProps('stadium')}
                                    {...textErrorHelper(formik, 'stadium')}
                                />
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik, 'result')}>
                                <Select
                                    id="result"
                                    variant='outlined'
                                    displayEmpty
                                    {...formik.getFieldProps('result')}
                                >
                                    <MenuItem value="" disabled>Select a result</MenuItem>
                                    <MenuItem value="W" >Win</MenuItem>
                                    <MenuItem value="D" >Draw</MenuItem>
                                    <MenuItem value="L" >Loose</MenuItem>
                                    <MenuItem value="n/a" >Not available</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'result')}
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik, 'final')}>
                                <Select
                                    id="final"
                                    variant='outlined'
                                    displayEmpty
                                    {...formik.getFieldProps('final')}
                                >
                                    <MenuItem value="" disabled>Was the game played?</MenuItem>
                                    <MenuItem value="Yes" >Yes</MenuItem>
                                    <MenuItem value="No" >No</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'final')}
                            </FormControl>
                        </div>

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={loading}
                        >
                            {formType==="add"?
                            'Add match'
                            :
                            'Edit match'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMatch