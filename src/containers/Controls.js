import React, {Component} from "react";
import { SET, POWER,  updateVolume, updateDisplay } from "../store/actions";
import { connect} from "react-redux";
import '../containers/Controls.css'
class Controls extends Component {
    componentDidMount() {
        const POWER = document.querySelector('.powerInput');
        POWER.checked = true
    };
    render() {
        const {
        POWER,
        DISPLAY,
        SET,
        volume,
        updateVolume,
        updateDisplay,
        } = this.props
    console.log('volume, ',  volume);
        const handleSET = () => {{
         SET()
         console.log(updateDisplay(`Set ${SET ? 'I' : 'II'}`))
        }}
        const handleVolume = e => {
          updateVolume(e);
          updateDisplay(`Volume ${e.target.value}%`)
        }
        const handlePower = () => {
          POWER();
            console.log(updateDisplay(`Power ${POWER ? 'On' : 'Off'}`));
        }
        return (
            <>
        <div className="controls">
          <div className="item"></div>
          <div className="item power">
            Power: {' '}
            <label className="switch">
              <input
                type="checkbox"
                onChange={handlePower}
                className="powerInput"
              />
              <span className="toggle"></span>
            </label>
          </div>
          <div className="item display" id="display">
            {DISPLAY}
          </div>

          <div className="item volume">
            <input
              type="range"
              min="0"
              max="100"
              step='1'
              onChange={ e => handleVolume(e)}
              value={volume}
              className="slider"
            />
          </div>

          <div className="item set">
            SET: {' '}
            <label className="switch">
              <input type="checkbox" onChange={handleSET} />
              <span className="toggle"></span>
            </label>
          </div>

          <div className="item"></div>
        </div>
      </>
         )
     }
}

const mapStateToProps = ({ SET, volume, DISPLAY, POWER, updateVolume }) => ({
    SET,
    DISPLAY,
    POWER,
    volume,
    updateVolume,
  });
  
  const mapDispatchToProps = dispatch => ({
    SET: () => dispatch(SET()),
    updateVolume: e => dispatch(updateVolume(e)),
    POWER: () => dispatch(POWER()),
    updateDisplay: str => dispatch(updateDisplay(str)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Controls)