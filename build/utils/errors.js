"use strict";
class ContainerError {
    constructor() {
        this.containerNotFound = () => {
            const errorMessage = {
                "statusCode": 404,
                "message": "Container not found"
            };
            return errorMessage;
        };
    }
}
module.exports = ContainerError;
