export const initialState={
    token:null,
    premium:false
}

const reducer = (state,action) => {
    switch(action.type){
        case 'INITIALIZE_TOKEN':
            const tokenFromStorage=localStorage.getItem('token');
            const premiumFromStorage=localStorage.getItem('premium');
            return {
                token:tokenFromStorage,
                premium:premiumFromStorage
            }
        case 'SET_TOKEN':
            if(localStorage.getItem('token')==null || localStorage.getItem('token')===undefined || localStorage.getItem('token')==='undefined' || localStorage.getItem('token')==='null'){
                localStorage.setItem('token',action.token);
                localStorage.setItem('premium',action.premium);
            }
            return {
                token:action.token,
                premium:action.premium
            }
        case 'REMOVE_TOKEN':
            localStorage.removeItem('token');
            localStorage.removeItem('premium');
            return {
                token:null,
                premium:false
            }
        case 'SET_PREMIUM':
            localStorage.setItem('premium',action.premium);
            return {
                ...state,
                premium:action.premium
            }
        default:
            return state;
    }
}

export default reducer;