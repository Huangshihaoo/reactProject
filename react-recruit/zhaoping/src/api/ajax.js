/**
 * 包装axios
 * 使axios更好用
*/

import axios from "axios";

export default function ajax(url, data = {}, method = "GET") {
                            if (method === "GET") {
                                let getUrl = "";
                                // 取得对象的键[]
                                const dataKey = Object.keys(data);
                                // 遍历
                                dataKey.forEach((item) => {
                                    getUrl += item + "=" + data[item] + "&";
                                });

                            if (getUrl) {
                                getUrl = "?" + getUrl.substr(0, getUrl.length - 1);
                            }
                        return axios.get(url + getUrl);
                        
                        } else {
                            return axios.post(url, data);
                        }
                    }
