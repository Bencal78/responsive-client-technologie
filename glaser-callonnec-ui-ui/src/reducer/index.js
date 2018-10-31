const initialState = {
    isMenuOpen: false,
    attractions: [
        {
            id:1,
            name: 'Grand Huit',
            date: '1999-12-12',
            price: 10
        }
    ],
    batiments: [
        {
            id:1,
            name: 'restaurant',
            date: '1999-12-12',
        }
    ],
    people: [
        {
            id:1,
            name: 'Bertrand',
            age: 22,
            job: 'director',
            salary: 100000
        },
        {
            id:2,
            name: 'Benjamin',
            age: 22,
            job: 'technician',
            salary: 10000
        }
    ],
    maintenances: [
        {
            id: 1,
            dateLastMaintenance: '1999-12-12',
            dateNextMaintenance: '1999-12-12',
            attractionId: 1,
            technicianId: 2,

        }
    ],
    stats: [
        {
            id: 1,
            date: '2015-12-12',
            numberVisitor: 1000,
            income: 10000
        },
        {
            id: 2,
            date: '2015-12-13',
            numberVisitor: 700,
            income: 8000
        },
        {
            id: 3,
            date: '2015-12-14',
            numberVisitor: 1100,
            income: 7000
        },
        {
            id: 4,
            date: '2015-12-15',
            numberVisitor: 12000,
            income: 8000
        },
        {
            id: 5,
            date: '2015-12-16',
            numberVisitor: 1100,
            income: 16000

        },
        {
            id: 6,
            date: '2015-12-17',
            numberVisitor: 7000,
            income: 7000

        }
    ]
};

const classification = (array) => {
    const newArray = array.slice();

    for( let i = 0; i < array.length-1; i++ ) {
        if(newArray[i].date > newArray[i+1].date) {
            const tmp = newArray[i];
            newArray[i] = newArray[i+1];
            newArray[i+1] = tmp;
        }
    }


    for( let i = array.length-1 ; i > 0; i-- ) {
        if(newArray[i].date < newArray[i-1].date) {
            const tmp = newArray[i];
            newArray[i] = newArray[i-1];
            newArray[i-1] = tmp;
        }
    }

    return newArray
};

const Reducer = ( state = initialState, action) => {
    switch (action.type) {

    // ONLY TOOGLE THE MENU DRAWER
        case 'CHANGE_IS_MENU_OPEN':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };

    // ALL THE CREATORS
        case 'CREATE_ATTRACTION':
            return {
                ...state,
                attractions: [...state.attractions, action.payload]
            };
        case 'CREATE_PERSON':
            return {
                ...state,
                people: [...state.people, action.payload]
            };
        case 'CREATE_BATIMENT':
            return {
                ...state,
                batiments: [...state.batiments, action.payload]
            };
        case 'CREATE_MAINTENANCE':
            return {
                ...state,
                maintenances: [...state.maintenances, action.payload]
            };
        case 'CREATE_STAT':
            return {
                ...state,
                stats: classification([...state.stats, action.payload])
            };

    // ALL THE SETTERS
        case 'SET_ATTRACTION':
            return {
                ...state,
                attractions: state.attractions.map(a => a.id === action.payload.id ? action.payload : a)
            };
        case 'SET_BATIMENT':
            return {
                ...state,
                batiments: state.batiments.map(b => b.id === action.payload.id ? action.payload : b)
            };
        case 'SET_PERSON':
            return {
                ...state,
                people: state.people.map(p => p.id === action.payload.id ? action.payload : p)
            };
        case 'SET_MAINTENANCE':
            return {
                ...state,
                maintenances: state.maintenances.map(m => m.id === action.payload.id ? action.payload : m)
            };
        case 'SET_STAT':
            return {
                ...state,
                stats: classification(state.stats.map(s => s.id === action.payload.id ? action.payload : s))
            };

    // ALL THE ERASERS
        case 'DELETE_ATTRACTION':
            return {
                ...state,
                attractions: state.attractions.filter(a => a.id !== action.payload)
            };
        case 'DELETE_PERSON':
            return {
                ...state,
                people: state.people.filter(p => p.id !== action.payload)
            };
        case 'DELETE_BATIMENT':
            return {
                ...state,
                batiments: state.batiments.filter(b => (b.id !== action.payload))
            };
        case 'DELETE_MAINTENANCE':
            return {
                ...state,
                maintenances: state.maintenances.filter(m => (m.id !== action.payload))
            };
        case 'DELETE_STAT':
            return {
                ...state,
                stats: classification(state.stats.filter(s => (s.id !== action.payload)))
            };

        default:
            return state
    }
};

export default Reducer;