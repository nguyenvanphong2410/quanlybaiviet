const responseSuccess = (res, data, status = 200, message = 'Success', error = false,) => {
    return res.status(status).json({
        status,
        error,
        message,
        data
    })
}

const responseError = (res, status = 400, message = 'Error', error = true) => {
    return res.status(status).json({
        status,
        error,
        message,
    })
}

const responseErrorDetail = (res, status = 400, message = 'Error', detail, error = true) => {
    return res.status(status).json({
        status,
        error,
        message,
        details: [detail]
    })
}

const responseValidateFailed = (res, error_details) => {
    return res.status(400).json({
        statusCode: 400,
        error: true,
        message: "Validation Failed",
        details: [error_details],
    });
};

module.exports = {
    responseSuccess,
    responseError,
    responseErrorDetail,
    responseValidateFailed
}
