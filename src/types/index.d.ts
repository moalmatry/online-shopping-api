/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { updatePasswordInput } from '../schema/user.schema';
import { Gender, Role, User } from '@prisma/client';

export interface CustomRequest extends Request {
  requestTime?: string;
  user?: ExtendedUser;
}

export interface CustomRequestUpdatePassword extends Request<object, object, updatePasswordInput> {
  requestTime?: string;
  user: ExtendedUser;
}

export interface ExtendedUser extends User {
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
  };
  address: {
    id?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    street?: string;
  };
}
export interface CustomRequests<B = any, C = any, D = any> extends Request<object, B, C, D> {
  requestTime?: string;
  user: ExtendedUser;
}

// updateMe
export interface UpdateMeDataProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: Gender;
  phoneNumber?: string | null;
  city?: string;
  state?: string;
  zipCode?: string;
  street?: string;
}

export interface CreateAddressInput {
  id: string;
  city?: string;
  state?: string;
  zipCode?: string;
  street?: string;
}

export interface UpdateUserProps extends UpdateMeDataProps {
  verified?: boolean;
  role?: Role;
  active?: boolean;
}

export interface ProductDataProps {
  name: string;
  description: string;
  tags: string[];
  categoryName: string;
  variants: {
    name: string;
    price: number;
    images: string[];
    description: string;
    available: boolean;
    quantity: number;
  }[];
}
export interface UpdateProductProps {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
  categoryName?: string;
}

export interface UpdateVariant {
  id: string;
  name?: string;
  price?: number;
  images?: string[];
  description?: string;
  available?: boolean;
  quantity?: number;
}

export interface UserInputService {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
