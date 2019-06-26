const rootReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MERCHANT':
            return state.concat([action.payload]);
        case 'DELETE_MERCHANT':
            return state.filter((merchant) => merchant.id !== action.id);
        case 'UPDATE_MERCHANT_DATA':
            return state.map((merchant) => {
                if (merchant.id === action.payload.id) {
                    return {
                        ...merchant,
                        name: action.payload.name,
                        description: action.payload.description,
                        history: [...action.payload.history]
                    }
                } else return merchant;
            })
        case 'UPDATE_MERCHANT_STATUS':
            return state.map((merchant) => {
                if (merchant.id === action.payload.id) {
                    return {
                        ...merchant,
                        status: action.payload.status,
                        history: [...action.payload.history]
                    }
                } else return merchant;
            })
        default:
            return state;
    }
}

export default rootReducer