import React, { Component } from "react";
import Audio from '../components/audio'
import Controls from "./Controls";
import PadKey from "./PadKey";
import '../containers/DrumPad.css'
import { connect } from "react-redux";
import {KEYPRESS, PLAY, updateDisplay } from "../store/actions";
class DrumPad extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress)
    }
    handleKeyPress = e => {
        const {SET, POWER, DATA1, DATA2, PLAY, updateDisplay} = this.props
        const arr = [81, 87, 67, 88, 90, 68, 65, 83, 69];
        const error = 'Power Off'
        if (arr.findIndex(elem => elem === e.keyCode) === -1) return;
        if (!POWER) {
          updateDisplay(error)
            return;
        }
        const data = SET ? DATA1 : DATA2
        const {keyTrigger, url, id} = data.filter(
            item => item.keyCode === e.keyCode
        )[0]
        const key = keyTrigger;
        const sound = id;
        const song = url

        console.log(sound, song)
        updateDisplay(`${sound}`)
        PLAY(song)

        const keyToAnimate = document.querySelector(`div[data-key="${key}"]`);
        console.log(keyToAnimate);
        keyToAnimate.classList.add('playing');
        setTimeout(() => {
          keyToAnimate.classList.remove('playing');
        }, 100);
        this.playSound(key);
    }
    playSound = key => {
      const {volume} = this.props
        const audio = document.getElementById(key)
        if (!audio) return;
        audio.currentTime = 0;
        audio.volume =  volume / 100;
       audio.play()
    }
    render() {
        const {SET, volume, DATA1, DATA2} = this.props
        const keyboard = items => {
            return (
                <div className="keys">
          {items.map(item => (
            <PadKey
              key={item.keyTrigger}
              keyCode={item.keyTrigger}
              sound={item.id}
              song={item.url}
            >
          </PadKey>
          ))}
    </div>
      );
        }
        const audios = items => {
          return (
              <div>
        {items.map(item => (
          <Audio
           key={item.keyTrigger}
           id={item.keyCode}
            src={item.url}
            keyCode={item.keyTrigger}
            volume={volume / 100.0}
          />
          ))}
          </div>
          );
        }
       return (
            <>
        <div className="drum" id="drum-machine">
          <div className="pad">
          {SET ? keyboard(DATA1) : keyboard(DATA2)}
          {SET ? audios(DATA1) : audios(DATA2)}
          </div>
          <div className="my-display">
            <Controls />
          </div>
        </div>
      </>
        )
    }
}

const mapStateToProps = ({
    KEYPRESS,
    DATA1,
    DATA2,
    SET,
    volume,
    DISPLAY,
   POWER,
  }) => ({
    KEYPRESS,
    DATA1,
    DATA2,
    SET,
    volume,
    DISPLAY,
   POWER
  });
  
  const mapDispatchToProps = dispatch => ({
    KEYPRESS: e => dispatch(KEYPRESS(e)),
    PLAY: song => dispatch(PLAY(song)),
    updateDisplay: str => dispatch(updateDisplay(str)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DrumPad);