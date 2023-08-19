import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            if (state.value > 0) {
                state.value -= 1
            } else { return}
           
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        reset: state =>{
            state.value = 0
        },
        putInitialValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

//Exportamos las acciones del slice
export const {increment, decrement, incrementByAmount, reset, putInitialValue} = counterSlice.actions

export default counterSlice.reducer