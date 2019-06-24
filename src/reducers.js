// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case "GET_FRIENDS":
            return { ...state, friends: action.data };
        case "SEND_FRIEND_REQUEST":
            return { ...state, friends: action.data };
        case "ACCEPT_FRIEND_REQUEST":
            return {
                ...state,
                friends: state.friends.map(friend => {
                    if (friend.id == action.data) {
                        friend.accepted = true;
                    }
                    return friend;
                })
            };
        case "UNFRIEND":
            return {
                ...state,
                friends: state.friends.filter(
                    friend => friend.id != action.data
                )
            };
        case "GET_CHAT_HISTORY":
            return { ...state, messages: action.data };
        case "GET_PRIVATE_CHAT_HISTORY":
            return { ...state, privateMessages: action.data };
        case "NEW_MESSAGE":
            console.log("action.data", action.data.receiver_id);
            if (action.data.receiver_id == null) {
                return { ...state, messages: [...state.messages, action.data] };
            } else {
                return {
                    ...state,
                    privateMessages: [...state.privateMessages, action.data]
                };
            }
            return { ...state, messages: [...state.messages, action.data] };
        case "CURRENT_CHAT":
            return { ...state, currentChat: action.data };
        default:
            return state;
    }
}
