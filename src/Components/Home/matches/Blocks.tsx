import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { matchesCollection } from '../../../firebase';
import { getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import MatchesBlock from '../../Utils/matches_block';

interface MatchData {
  id: string;
  date: string;
  localThmb: string;
  local: string;
  resultLocal: string;
  awayThmb: string;
  away: string;
  resultAway: string;
  final: boolean;
}

const Blocks: React.FC = () => {
  const [matches, setMatches] = useState<MatchData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const snapshot = await getDocs(matchesCollection);
            const matchesData: MatchData[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                id: doc.id,
                date: doc.data().date,
                localThmb: doc.data().localThmb,
                local: doc.data().local,
                resultLocal: doc.data().resultLocal,
                awayThmb: doc.data().awayThmb,
                away: doc.data().away,
                resultAway: doc.data().resultAway,
                final: doc.data().final,
            }));
            setMatches(matchesData);
            console.log(matchesData);
        } catch (error) {
            console.error('Error fetching documents: ', error);
        }
    };

    if (matches.length === 0) {
        fetchData();
    }
}, [matches]);

  const showMatches = (matches: MatchData[]) => (
    matches
      ? matches.map((match) => (
        <Slide key={match.id} className="item" triggerOnce>
          <div>
            <div className="wrapper">
              <MatchesBlock match={match} />
            </div>
          </div>
        </Slide>
      ))
      : null
  );

  return (
    <div className="home_matches">
      {showMatches(matches)}
    </div>
  );
};

export default Blocks;
