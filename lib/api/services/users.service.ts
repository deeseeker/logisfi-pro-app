import { apiClient, type RequestOptions } from "../client";
import type {
  AddUserToOrganizationCommand,
  StringBaseResponse,
  UpdateProfileCommand,
  UserModelBaseResponse,
} from "../types/models";

/**
 * Gets a user's profile
 * `GET /users/profile`
 */
export async function getProfile(options?: RequestOptions): Promise<UserModelBaseResponse> {
  return apiClient.get<UserModelBaseResponse>("/users/profile", options);
}

/**
 * Update's a user profile
 * `POST /users/update-profile`
 */
export async function updateProfile(body: UpdateProfileCommand, options?: RequestOptions): Promise<UserModelBaseResponse> {
  return apiClient.post<UserModelBaseResponse>("/users/update-profile", body, options);
}

/**
 * Add a user to existing organization
 * `POST /users/add-to-organization`
 */
export async function addUserToOrganization(body: AddUserToOrganizationCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/users/add-to-organization", body, options);
}
