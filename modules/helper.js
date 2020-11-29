module.exports = {
    failedConnectionServer : async (res ,error) => {
            res.status(200).send({
                result : 'failed',
                data : [],
                message: `Request server failed. Error : ${error}`      
        })
    }
}