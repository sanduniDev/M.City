import { useEffect, useReducer, useState } from 'react';
import { showErrorToast } from '../Utils/tools';

import { CircularProgress } from '@mui/material'
import { matchesCollection } from '../../firebase';

import LeagueTable from './tables';
import MatchesList from './matchesList';
import { getDocs, DocumentData } from 'firebase/firestore';

interface State {
    filterMatches: DocumentData[] | null;
    playedFilter: playedType;
    resultFilter: resultType;
}

type playedType = 'All' | 'Yes' | 'No';
type resultType = 'All' | 'W' | 'L' | 'D';

const TheMatches = () => {

    const [matches, setMatches] = useState<DocumentData[] | null>(null);
    const [state,dispatch] = useReducer((prevState:State,nextState:Partial<State>)=>{
        return {...prevState,...nextState}
    },{
        filterMatches:null,
        playedFilter:'All',
        resultFilter:'All'
    })

    useEffect(() => {

        if (!matches) {
            getDocs(matchesCollection).then(snapshot => {
                const matches = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMatches(matches);
                dispatch({...state,filterMatches:matches})
            }).catch(error => {
                showErrorToast(error)
            })

        }
    }, [matches,state]);

    const showPlayed = (played:playedType) =>{
        const list = matches?.filter((match)=>{
            return match.final=== played
        });

        dispatch({
            ...state,
            filterMatches: played ==='All'? matches :list,
            playedFilter:played,
            resultFilter: 'All'
        });
    }

    const showResult = (result:resultType) =>{
        const list = matches?.filter((match)=>{
            return match.result === result
        });

        dispatch({
            ...state,
            filterMatches: result ==='All'? matches :list,
            playedFilter:'All',
            resultFilter: result
        });
    }

    console.log(state.filterMatches)

    return (
        <>
            {matches ?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                            <div className='match_filters'>
                                <div className='match_filters_box'>
                                    <div className="tag">Show matches</div>
                                    <div className="cont">
                                        <div className={`option ${state.playedFilter==='All'?'active':''}`}
                                            onClick={()=>showPlayed('All')}
                                        >
                                            All
                                        </div>
                                        <div className={`option ${state.playedFilter==='Yes'?'active':''}`}
                                            onClick={()=>showPlayed('Yes')}
                                        >
                                            Played
                                        </div>
                                        <div className={`option ${state.playedFilter==='No'?'active':''}`}
                                            onClick={()=>showPlayed('No')}
                                        >
                                            Not played
                                        </div>
                                    </div>
                                </div>
                                <div className='match_filters_box'>
                                <div className="tag">Result games</div>
                                    <div className="cont">
                                        <div className={`option ${state.resultFilter==='All'?'active':''}`}
                                            onClick={()=>showResult('All')}
                                        >
                                            All
                                        </div>
                                        <div className={`option ${state.resultFilter==='W'?'active':''}`}
                                            onClick={()=>showResult('W')}
                                        >
                                            W
                                        </div>
                                        <div className={`option ${state.resultFilter==='L'?'active':''}`}
                                            onClick={()=>showResult('L')}
                                        >
                                            L
                                        </div>
                                        <div className={`option ${state.resultFilter==='D'?'active':''}`}
                                            onClick={()=>showResult('D')}
                                        >
                                            D
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MatchesList matches={state.filterMatches}/>
                        </div>
                        <div className="right">
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
            :
                <div className="progress">
                    <CircularProgress />
                </div>
            }
        </>
    )
}

export default TheMatches