module.exports = {
    failedConnectionServer : async (res ,error) => {
            res.status(200).send({
                result : 'failed',
                data : [],
                msg: `Request server failed. Error : ${error}`      
        })
    }
}