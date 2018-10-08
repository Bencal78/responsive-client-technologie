const initialState = {
    isMenuOpen: false
};

const Reducer = ( state = initialState, action) => {

    switch (action.type) {

        case 'CHANGE_IS_MENU_OPEN':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };

        default:
            return state
    }
};

export default Reducer;