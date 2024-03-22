export const initialState={
    token:null,
    user:{
        name:'',
        email:'',
        role:'',
        subtype:'', 
        fav:[],
        watchlist:[]
    }
}

const reducer = (state,action) => {
    switch(action.type){
        case 'INITIALIZE_TOKEN':
            const tokenFromStorage=localStorage.getItem('token');
            return {
                token:tokenFromStorage,
            }
        case 'SET_USER':
            return {
                ...state,
                user:action.user
            }
        case 'REMOVE_TOKEN':
            localStorage.removeItem('token');
            return {
                token:null,
                user:{
                    name:'',
                    email:'',
                    role:'',
                    subtype:''
                }
            }
        case 'SET_TOKEN':
            localStorage.setItem('token',action.token);
            return {
                token:action.token,
                user:{
                    name:'',
                    email:'',
                    role:'',
                    subtype:''
                }
            }

        default:
            return state;
    }
}

export default reducer;