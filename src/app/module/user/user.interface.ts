/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { UserRoles } from "./user.constant";

export interface Userinterface {
    name: string;
    email: string;
    role?: 'user' | 'admin';
    password: string;
    phone: string;
    address: string

}
export type UserRoletypes = keyof typeof UserRoles

export interface Usermodels extends Model<Userinterface> {
    isPasswordmatch(inputtextPassword: string | unknown, hashpassword: string | unknown): Promise<boolean>
}