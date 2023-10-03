import { Slide } from "react-awesome-reveal";
import { Promise } from 'ts-promise';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { playersCollection } from "../../firebase";
import { useEffect, useState } from "react";
import { showErrorToast } from "../Utils/tools";
import { CircularProgress } from "@mui/material";
import { getDocs,DocumentData } from "firebase/firestore";
import PlayerCard from "../Utils/playerCard";

const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState<DocumentData>();

    useEffect(() => {
        if (!players) {

            getDocs(playersCollection).then(snapshot => {
                const players:DocumentData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                let promises: any = [];

                players.forEach((player:DocumentData, index:number) => {
                    new Promise((resolve, reject) => {
                        const storage = getStorage();
                        getDownloadURL(ref(storage, `players/${player.image}`))
                        .then(url=>{
                            players[index].url = url;
                            resolve(url)
                        }).catch(err=>{
                            reject(err);
                        })
                    })
                    
                })
                
                Promise.all(promises).then(()=>{
                    setPlayers(players);
                })
            }).catch(error => {
                console.log(error)
                showErrorToast("try again later")
            }).finally(() => {
                
                setLoading(false)
            })
        }
    },[players])



    const showPlayerByCategory = (category: "Keeper"|"Defence"|"Midfield"|"Striker") => (
        players ?
            players.map((player:DocumentData,i:number)=>{
                return player.position === category ?
                    <Slide key={player.id} triggerOnce>
                        <div className="item">
                            <PlayerCard
                                 number={player.number}
                                 name={player.name}
                                 lastname={player.lastname}
                                 bck={player.url}
                            />
                        </div>
                    </Slide>
                :null
            })
        :null
    )

    return (
        <div className="the_team_container">
            {loading?
            <div className="progress">
                <CircularProgress/>
            </div>
            :
            <div>
                <div className="team_category_wrapper">
                    <div className="title">Keepers</div>
                    <div className="team_cards">
                        {showPlayerByCategory('Keeper')}
                    </div>
                </div>

                <div className="team_category_wrapper">
                    <div className="title">Defence</div>
                    <div className="team_cards">
                        {showPlayerByCategory('Defence')}
                    </div>
                </div>

                <div className="team_category_wrapper">
                    <div className="title">Midfield</div>
                    <div className="team_cards">
                        {showPlayerByCategory('Midfield')}
                    </div>
                </div>

                <div className="team_category_wrapper">
                    <div className="title">Striker</div>
                    <div className="team_cards">
                        {showPlayerByCategory('Striker')}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default TheTeam