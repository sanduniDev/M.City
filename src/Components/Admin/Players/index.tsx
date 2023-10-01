import { useEffect, useState } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'
import { playersCollection } from '../../../firebase'
import { query, getDocs, limit, startAfter } from "firebase/firestore";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showErrorToast, showSuccessToast } from '../../Utils/tools';
import { Link, useNavigate } from 'react-router-dom'; 


const AdminPlayers = () => {

    const [lastVisible, setLastVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {

        if (!players) {
            setLoading(true);
            const q = query(playersCollection, limit(2));

            console.log(q)
            getDocs(q).then(snapshot => {
                //console.log(snapshot)
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const players = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setPlayers(players)

                //     console.log(lastVisible);
                // console.log(players)

            }).catch(error => {
                showErrorToast(error);
            }).finally(() => {
                setLoading(false)
            });




        }
    }, [players]);

    const loadMorePlayers = () => {
        if (lastVisible) {
            setLoading(true);
            const q = query(playersCollection, startAfter(lastVisible), limit(2));

            getDocs(q).then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                const newPlayers = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setPlayers([...players, ...newPlayers])

                //     console.log(lastVisible);
                // console.log(players)

            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setLoading(false)
            });

        } else {
            showErrorToast("nothing to load")
        }
    }

    console.log("aaaaaaaa")
    console.log(lastVisible);
    console.log(players)

    return (
        <AdminLayout title="The Players" navigate={navigate} >
            <div className="mb-5">
                <Button
                    variant="outlined"
                    component={Link}
                    to={'/admin_players/add_player'}
                >
                    Add Player
                </Button>
            </div>

            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players ?  
                            players.map((player:any,i:number)=>(
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                        {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                        {player.lastname}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {player.number}
                                    </TableCell>
                                    <TableCell>
                                        {player.position}
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
                onClick={() => loadMorePlayers()}
                disabled={loading}
            >
                Load more players
            </Button>

            <div className="admin_progress">
                {loading?
                <CircularProgress thickness ={7} style={{color:'#98c59'}}/>


            :null}
            </div>
        </AdminLayout>
    )
}

export default AdminPlayers





// In the code above, I've removed .push from navigate, as it's not needed. 
// The navigate function itself is used to navigate to the specified path. 