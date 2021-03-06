import React, { useEffect } from "react";
import { connect } from "react-redux";
import Player from "../player";
import Map from "../map";
import store from "../../state/store";
import { updateTiles } from "../../data/maps/1";
import { initialize } from "../../state/actions/user";

function World(props) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
  let tiles = [];
  const getTiles = async () => {
    store.dispatch({ type: "ADD_TILES" });
    tiles = await updateTiles();

    store.dispatch({
      type: "ADD_TILES_SUCCESS",
      payload: {
        tiles: tiles.tiles,
        sortedTiles: tiles.sortedTiles
      }
    });
  };

  useEffect(() => {
    const start = async () => {
      await getTiles();
      props.initialize();
    };

    start();
  }, []);

  if (props.loading) {
    return (
      <div
        style={{
          backgroundColor: "#333",
          width: "100vw",
          height: "100vh",
          poaition: "absolute",
          top: 0,
          left: 0
        }}
      >
        <div className="nav">
          <h1>Field Explorer</h1>
        </div>{" "}
        <div class="spinner"></div>
      </div>
    );
  }
  return (
    <div className="entire-page">
      <div className="nav">
        <h1>Field Explorer</h1>
        <h3
          onClick={() => {
            localStorage.clear();
            props.history.push("/login");
          }}
        >
          Sign Out
        </h3>
      </div>
      <div className="main">
        <div
          style={{
            position: "relative",
            width: "1000px",
            maxHeight: "1200px"
          }}
        >
          <Map />
          <Player />
        </div>
        <div className="info">
          <p className="world-ui">
            Current Room:{" "}
            {props.sortedTiles.length > 0
              ? props.sortedTiles[props.room].title
              : 0}
          </p>
          <p className="world-ui">
            Room Description:{" "}
            {props.sortedTiles.length > 0
              ? props.sortedTiles[props.room].description
              : ""}
          </p>
          <p
            style={{
              backgroundColor: `${props.room === 99 ? "yellow" : "lightgreen"}`
            }}
          >
            {props.room === 99
              ? "Mission Accomplished!"
              : "Reach the Treasure room: Navigate with your arrow keys"}
          </p>
          <p className="world-ui">
            Other Players In Same Room: <br />
            {props.otherUsers.map(user => (
              <>
                {user}
                <br />
              </>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
    ...state.user,
    ...state.map
  };
}

export default connect(mapStateToProps, { initialize })(World);
