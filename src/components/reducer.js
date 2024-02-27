import {ADD_TODO, REMOVE_TODO} from './actionTypes.js'



const Reducer =(state,action)=>{
    
    switch(action.type){
        case ADD_TODO:   
            return [...state, action.payload]
        case REMOVE_TODO:
           return state.filter((todo)=>todo !==action.payload)
        default:
          console.log("NO SUCH ACTION TYPE");

    }

}

export default Reducer
