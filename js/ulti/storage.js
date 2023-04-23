const  DATA_KEY = 'WEB_SSD'
export default {
    get: () => { 
        return JSON.parse(localStorage.getItem(DATA_KEY)) || {}
    },
    set: (data) => localStorage.setItem(DATA_KEY, JSON.stringify(data))
}