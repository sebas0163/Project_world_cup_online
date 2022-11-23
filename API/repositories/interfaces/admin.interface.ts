import { Admin } from "../../models/admin";

export interface IAdminRepository {
    login(email: string, password: string): Promise<Admin>;
}