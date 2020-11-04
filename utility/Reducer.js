import {combineReducers} from "redux";

export const loadingg = (state='',action) => {
      return (action.type === 'SET_Loadingg') ?
          action.payload:state;
};

export const all_data = (state='',action) => {
    return (action.type === 'SET_AllData') ?
        action.payload:state;
};

export const modal_data = (state='',action) => {
    return (action.type === 'SET_ModalData') ?
        action.payload:state;
};

let appReducer = combineReducers({
    loadingg,
    all_data,
    modal_data
});

export default appReducer;

