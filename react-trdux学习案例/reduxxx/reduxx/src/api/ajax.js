import axios from "axios";

export default function ajax(
    url,
    data = {userName:123,password:123,userType:'dashen'},
    method = "GET"
) {
    if (method === "GET") {
        let getUrl = "";
        let dataKey = Object.keys(data);
        dataKey.forEach((item) => {
            getUrl += item + "=" + data[item] + "&";
        });
        if (getUrl) {
            getUrl = "?" + getUrl.substr(0, getUrl.length - 1);
        }
        return axios.get(url + "?" + getUrl);
    } else {
        console.log(url,data);
        return axios.post(url, data);
    }
}
