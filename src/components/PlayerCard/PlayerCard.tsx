import React from "react";
import BarGraph from "../BarGraph/BarGraph";
import ScatterPlot from "../ScatterPlot/ScatterPlot";
import RadialPerc from "../RadialPerc/RadialPerc";
import "./style.scss";

const PlayerCard: React.FC<WithProps> = ({ player }) => {
  const svgWidth = 28;
  const arcWidth = 3;
  const graphWidth = 280;
  const graphHeight = 110;

  const getHandicap = (handicap: number) => {
    if (handicap <= -4) {
      return "PRO";
    }
    if (handicap <= -3) {
      return "SEMI-PRO";
    }
    if (handicap <= -2) {
      return "AMT";
    }
    if (handicap <= -1) {
      return "BEG";
    }
    if (handicap <= 0) {
      return "NEW";
    }
  };

  return (
    <div className="playercard">
      <div className="header">
        <div className="avatar" />
        <div>
          <div className="title">
            <h2 className="name">{player.PlayerName}</h2>
            <h3 className="location">{player.HomeCourse}</h3>
            {/* <h3 className="location">Rye Golf Club (Old), UK</h3> */}
          </div>
          <div className="shortform">
            <div className="breakdown">
              <div className="quality">
                <span>Quality</span>
                <span className="number">{player.Quality}</span>
              </div>
              <RadialPerc
                svgWidth={svgWidth}
                arcWidth={arcWidth}
                progressPercentage={player.Quality}
                colorIndicator={"#F43168"}
              />
            </div>
            <div className="breakdown">
              <div className="handicap">
                <span>Handicap</span>
                <span className="number">{getHandicap(player.Handicap)}</span>
              </div>
            </div>
            <div className="breakdown">
              <div className="sgTotal">
                <span>SG Total</span>
                <span className="number">{player.SGTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="barstats">
        {player.SGCategories.map((cat: any, index: number) => {
          return <BarGraph key={index} data={cat} />;
        })}
      </div>
      <hr />
      <div className="latestAct">
        Latest Activity: <span>68 (-4), The Shire, UK</span>
      </div>
      <hr />
      <div className="latestAct">Strokes Gained Total - Last 10</div>
      <div>
        <ScatterPlot
          data={player}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
        />
      </div>
    </div>
  );
};

export default PlayerCard;

interface WithProps {
  player: any;
}
