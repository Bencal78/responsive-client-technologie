const initialState = {
    isMenuOpen: false,
    attraction: [
        {
            id:1,
            name: 'grand8',
            date: new Date('October 15, 2018 11:20:00'),
            price: 10
        }
    ]
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