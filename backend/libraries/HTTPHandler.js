class HTTPHandler {
    BadInput(res, message) {
        res.status(400).json({
            status: "FAILED",
            message
        })
    }

    ServerError(res, error) {
        res.status(500).json({
            status: "FAILED",
            error
        })
    }

    OK(res, message, data) {
        if (data) {
            res.status(200).json({
                status: "SUCCESS",
                message,
                data
            })
        } else {
            res.status(200).json({
                status: "SUCCESS",
                message
            })
        }
    }
}

module.exports = HTTPHandler;