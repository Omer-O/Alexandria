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
