import React from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import "./style.scss";

const Dashboard: React.FC<WithProps> = ({ data }) => {
  return (
    <div id="dashboard">
      <ul>
        {data.map((player: any) => {
          return (
            <li key={player.PlayerName}>
              <PlayerCard player={player} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;

interface WithProps {
  data: any;
}
