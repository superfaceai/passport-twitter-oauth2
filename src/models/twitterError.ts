export interface TwitterErrorResponse {
  data: TwitterError;
}

export interface TwitterError {
  errors: [
    {
      message: string;
      code: string;
    }
  ];
}
