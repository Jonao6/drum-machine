import { drumMachineSlice } from "./slice";
export const {
    SET,
    DATA1,
    DATA2,
    DISPLAY,
    KEYPRESS,
    PLAY,
    POWER,
    volume
} = drumMachineSlice.actions

export const updateVolume = event => ({
    type: volume,
    payload: event.target.value,
  });
  export const updateDisplay = value => ({
    type: DISPLAY,
    payload: value,
  });
  