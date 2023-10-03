import { useEffect, useState } from 'react'
import { matchesCollection } from '../../../firebase';
import { query, getDocs, limit, startAfter } from "firebase/firestore";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showErrorToast } from '../../Utils/tools';
import { Link,useNavigate } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';

const AdminMatches = () => {

    const [lastVisible, setLastVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {

        if (!matches) {
            setLoading(true);
            const q = query(matchesCollection, limit(2));

            console.log(q)
            getDocs(q).then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const matches = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setMatches(matches)

            }).catch(error => {
                showErrorToast(error);
            }).finally(() => {
                setLoading(false)
            });




        }
    }, [matches]);

    const loadMoreMatches = () => {
        if (lastVisible) {
            setLoading(true);
            const q = query(matchesCollection, startAfter(lastVisible), limit(2));

            getDocs(q).then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const newMatches = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setMatches([...matches, ...newMatches])

            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setLoading(false)
            });

        } else {
            showErrorToast("nothing to load")
        }
    }



    return (
        <AdminLayout title="The Matches" navigate={navigate}>
            <div className="mb-5">
                <Button
                    variant="outlined"
                    component={Link}
                    to={'/admin_matches/add_match'}
                >
                    Add Match
                </Button>
            </div>

            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Match</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Final</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matches ?  
                            matches.map((match:any,i:number)=>(
                                <TableRow key={match.id}>
                                    <TableCell>
                                        {match.date}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                        {match.away} <strong>-</strong> {match.local}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {match.resultAway} <strong>-</strong> {match.resultLocal}
                                    </TableCell>
                                    <TableCell>
                                        {match.final ==="Yes"?
                                        <span className='matches_tag_red'>Final</span>
                                        :
                                        <span className='matches_tag_green'>Not played yet</span>}
                                    </TableCell>
                                </TableRow>
                            ))
                        : null}
                    </TableBody>
                </Table>

            </Paper>

            <Button
                variant='contained'
                color="primary"
                onClick={() => loadMoreMatches()}
                disabled={loading}
            >
                Load more 
            </Button>

            <div className="admin_progress">
                {loading?
                <CircularProgress thickness ={7} style={{color:'#98c59'}}/>


            :null}
            </div>
        </AdminLayout>
    )
}

export default AdminMatches