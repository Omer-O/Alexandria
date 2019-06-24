// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case "GET_DOCS":
            return { ...state, myDocs: action.data };
        case "GET_TEXT":
            return {
                ...state,
                txt: action.data
            };
        default:
            return state;
    }
}
