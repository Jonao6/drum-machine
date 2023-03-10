import { Component } from "react";
import { PLAY,  updateDisplay} from "../store/actions";
import { connect } from "react-redux";
import '../containers/PadKey.css'
class PadKey extends Component {

    render() {
        const {
            PLAY,
            keyCode,
            sound,
            song,
            POWER,
            updateDisplay,
        } = this.props
        const handleKeyPress = () => {
            if(!POWER) {
                const error = 'Power OFF';
                updateDisplay(error);
                return
            }
            updateDisplay(`${sound}`)
            PLAY(song);
            playSound(keyCode)
        }
        const playSound = key => {
            const {volume} = this.props
            const audio = document.querySelector(`audio[data-key="${key}"]`);
            if (!audio) return;
            audio.currentTime = 0; 
            audio.volume =  volume / 100;            
            audio.play();
          };
        return (
            <div className="drum-pad key" data-key={keyCode}  id={sound}onClick={handleKeyPress}>
              {keyCode}
            
            <span className="sound">{sound}</span>
          </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    updateDisplay: str => dispatch(updateDisplay(str)),
    PLAY: song => dispatch(PLAY(song)),
  });
  
  const mapStateToProps = ({volume , POWER, DISPLAY, SET }) => ({
    volume,
    POWER,
    DISPLAY,
    SET
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PadKey);