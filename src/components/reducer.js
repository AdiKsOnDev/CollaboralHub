import {ADD_TODO, CHANGE_THEME, REMOVE_TODO} from './actionTypes.js'



const Reducer =(state,action)=>{
    
    switch(action.type){
        case ADD_TODO:   
            return [...state, action.payload]
        case REMOVE_TODO:
           return state.filter((todo)=>todo !=action.payload)
       

    }

}

export default Reducer