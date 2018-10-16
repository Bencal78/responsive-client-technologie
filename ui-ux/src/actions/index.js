export const changeIsMenuOpen = () => {
    return {
        type: 'CHANGE_IS_MENU_OPEN',
    };
};

export const createAttraction = (attraction) => {
    return {
        type: 'CREATE_ATTRACTION',
        payload: attraction
    }
}