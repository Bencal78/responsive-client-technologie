import Batiments from "../layouts/components/Batiments";


// ONLY TOGGLE THE MENU DRAWER
export const changeIsMenuOpen = () => {
    return {
        type: 'CHANGE_IS_MENU_OPEN',
    };
};

// ALL THE CREATORS
export const createAttraction = (attraction) => {
    return {
        type: 'CREATE_ATTRACTION',
        payload: attraction
    }
};
export const createPerson = (person) => {
    return {
        type: 'CREATE_PERSON',
        payload: person
    }
};
export const createMaintenance = (maintenance) => {
    return {
        type: 'CREATE_MAINTENANCE',
        payload: maintenance
    }
};
export const createBatiment = (batiment) => {
    return {
        type: 'CREATE_BATIMENT',
        payload: batiment
    }
};
export const createStat = (stat) => {
    return {
        type: 'CREATE_STAT',
        payload: stat
    }
};

// ALL THE SETTERS
export const setAttraction = (attraction) => {
    return {
        type: 'SET_ATTRACTION',
        payload: attraction
    }
};
export const setPerson = (person) => {

    return {
        type: 'SET_PERSON',
        payload: person
    }
};
export const setBatiment = (batiment) => {
    return {
        type: 'SET_BATIMENT',
        payload: batiment
    }
};
export const setMaintenance = (maintenance) => {
    return {
        type: 'SET_MAINTENANCE',
        payload: maintenance
    }
};
export const setStat = (stat) => {
    return {
        type: 'SET_STAT',
        payload: stat
    }
};

// ALL THE ERASERS
export const deleteAttraction = (id) => {
    return {
        type: 'DELETE_ATTRACTION',
        payload: id
    };
};
export const deletePerson = (id) => {
    return {
        type: 'DELETE_PERSON',
        payload: id
    };
};
export const deleteBatiment = (id) => {
    return {
        type: 'DELETE_BATIMENT',
        payload: id
    };
};
export const deleteMaintenance = (id) => {
    return {
        type: 'DELETE_MAINTENANCE',
        payload: id
    };
};
export const deleteStat = (id) => {
    return {
        type: 'DELETE_STAT',
        payload: id
    };
};

