import { get } from "../utils/http";

const listUser = () => {
    get("/signer").then(res => console.log(res)).catch(err => {console.log(err)});
};

export { listUser };