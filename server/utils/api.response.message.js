function ApiResponse(res, statusCode, success, message, error = false, data = null) {
    if (!res) {
        return "please provide response string"
    }
    return res.status(statusCode).json({
        success,
        message,
        error,
        data
    })
}

export default ApiResponse;