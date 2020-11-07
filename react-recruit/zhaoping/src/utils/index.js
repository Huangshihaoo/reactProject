/**
 * 多个自制工具方法
*/

// 依据传入数据返回路径
export function way (type, header) {
    let url

    if(type === 'laoban') {
       url = 'laoban'
    }else {
        url = 'dashen'
    }

    if(!header) {
        url += 'info' 
    }
    return url
}