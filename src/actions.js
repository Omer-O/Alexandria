import axios from "./axios";

// all ajax requests will go in this file

export async function findDocs() {
    try {
        let data = await axios.get("/get-docs");
        console.log("actions found these docs: ", data.data);
        return {
            type: "GET_DOCS",
            data: data.data
        };
    } catch (err) {
        console.log(err);
    }
    return {};
}
// export async function findDocs() {
//     try {
//         let data = await axios.get("/get-text");
//         console.log("actions found these text: ", data.data);
//         return {
//             type: "GET_TEXT",
//             data: data.data
//         };
//     } catch (err) {
//         console.log(err);
//     }
//     return {};
// }
//
// export function send(id) {
//     axios.post("/add-friend", {
//         otherUserId: id
//     });
//     console.log("action: friend request sent");
//     return {
//         type: "SEND_FRIEND_REQUEST",
//         data: id
//     };
// }
//
// export function accept(id) {
//     axios.post("/accept-friendship", {
//         otherUserId: id
//     });
//     console.log("action: accepted friend request");
//     return {
//         type: "ACCEPT_FRIEND_REQUEST",
//         data: id
//     };
// }
