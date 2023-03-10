import {createSlice} from '@reduxjs/toolkit'
import initialState from './initalState'
export const drumMachineSlice = createSlice({
    name: 'drumPad',
    initialState: initialState,
    reducers: {
        SET (state) {
           state.SET = !state.SET
        },
        DATA1 (state) {
          return state.DATA1 
        },
        DATA2 (state) {
          return state.DATA2
        },
        DISPLAY (state, action) {
            state.DISPLAY = action.payload
        },
        KEYPRESS (state, action){
         state.KEYPRESS = action.payload
            },
        PLAY (state, action) {
            state.PLAY = action.payload
        },
        POWER (state, action) {
          state.POWER = !state.POWER
        },
        volume (state, action) {
           state.volume = action.payload
        },
        }
    }
)
