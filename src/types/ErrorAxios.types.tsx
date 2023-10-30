import axios from "axios";
import { ReactNode } from "react";
type ApiError = {
    AxiosError: ReactNode,
    code: string,
    config: string,
    message: string,
    name: string,
    request: string,
    response: string
};

function isApiErrorResponse(res: any): res is ApiError {
    return (
        res &&
        "AxiosError" in res &&
        "code" in res &&
        "config" in res &&
        "message" in res &&
        "name" in res &&
        "request" in res &&
        "response" in res
    );
}

export const handleErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        return "Unknown error";
    }

    if (!error.response) {
        return error.message;
    }

    if (!isApiErrorResponse(error.response.data)) {
        return error.message;
    }

    return error.response.data.message;
};

export const handleErrorCode = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        throw Error("Unknown error");
    }

    if (!error.response) {
        return error.status;
    }

    if (!isApiErrorResponse(error.response.data)) {
        return error.response.status;
    }

    return error.response.status;
};