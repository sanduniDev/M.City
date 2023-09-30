import React from 'react';

interface Match {
  date: string;
  localThmb: string;
  local: string;
  resultLocal: string;
  awayThmb: string;
  away: string;
  resultAway: string;
  final: boolean;
}

interface MatchesBlockProps {
  match: Match;
}

const MatchesBlock: React.FC<MatchesBlockProps> = ({ match }) => {
  return (
    <div className="match_block">
      <div className="match_date">
        {match.date}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div className="icon"
              style={{
                background: `url(/images/team_icons/${match.localThmb}.png)`
              }}
            >
            </div>
            <div className="team_name">
              {match.local}
            </div>
          </div>
          <div className="right">
            {match.final ? match.resultLocal : '-'}
          </div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div className="icon"
              style={{
                background: `url(/images/team_icons/${match.awayThmb}.png)`
              }}
            >
            </div>
            <div className="team_name">
              {match.away}
            </div>
          </div>
          <div className="right">
            {match.final ? match.resultAway : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchesBlock;
