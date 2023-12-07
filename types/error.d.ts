interface ErrorResponseData {
  error: string;
}

interface ErrorResponse {
  data?: ErrorResponseData;
  statusCode: number;
  statusMessage: string;
}
