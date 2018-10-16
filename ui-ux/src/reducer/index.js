const initialState = {
    isMenuOpen: false,
    attractions: [
        {
            id:1,
            name: 'grand8',
            date: new Date('October 15, 2018 11:20:00'),
            price: 10
        }
    ],
    batiments: [
        {
            id:1,
            name: 'restaurant',
            date: new Date('October 15, 2018 11:20:00'),
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
            dateLastMaintenance: new Date('October 15, 2018 11:20:00'),
            dateNextMaintenance: new Date('October 15, 2018 11:20:00'),
            attractionId: 1,
            technicianID: 2,

        }
    ],
    visitorStat: [
        {
            id: 1,
            date: new Date('October 15, 2018 11:20:00'),
            income: 10000,
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
        case 'CREATE_ATTRACTION':
            return{
                ...state,
                attractions: [...state.attractions, action.payload]
            };

        default:
            return state
    }
};

export default Reducer;