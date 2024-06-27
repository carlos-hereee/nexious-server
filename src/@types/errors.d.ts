export type StatusResponse = "success" | "error";
export interface StatusPayload {
  status: StatusResponse;
}
