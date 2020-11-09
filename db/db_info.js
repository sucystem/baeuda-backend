module.exports = (function(){
    return {
        local: {
            Host: "baeuda.cmzdcoaqigiy.ap-northeast-2.rds.amazonaws.com",
            Port: '3306',
            Username: "yourproj",
            Password: "2020slvmfhwprxm2"
        },
        real: {
            Host: "",
            Port: '',
            Username: "",
            Password: ""
        },
        staging: {
            Host: "",
            Port: '',
            Username: "",
            Password: ""
        },
        dev: {
            Host: "",
            Port: '',
            Username: "",
            Password: ""
        }
    }
})();