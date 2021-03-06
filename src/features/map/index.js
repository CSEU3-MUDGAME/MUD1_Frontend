import React from "react";
import { connect } from "react-redux";
import "./styles.css";

function Map(props) {
  function getTileSprite(type) {
    switch (type) {
      case 0:
        return "grass";
      case 1:
        return "clay";
      case 2:
        return "vfence";
      case 3:
        return "hfence";
      case 4:
        return "jfence";
      case 5:
        return "rock";
      case 6:
        return "tree";
      case 7:
        return "water";
      case 20:
        return "crate";
      default:
        return "grass";
    }
  }

  function MapTile(props) {
    return (
      <div
        className={`${getTileSprite(props.tile)}`}
        style={{
          minHeight: "23px",
          minWidth: "23px"
        }}
      ></div>
    );
  }
  function MapRow(props) {
    return (
      <div
        className="tile"
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        {props.tiles.map(tile => (
          <MapTile tile={tile} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        width: "1160px",
        height: "700px",
        border: "4px solid #F9BA02",
        backgroundColor: "#6DF7B1"
      }}
    >
      {props.tiles.map(row => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles
  };
}

export default connect(mapStateToProps)(Map);
