import argon2 from 'argon2';
import { db } from '../db';
import { UpdateMeDataProps, UpdateUserProps, UserInputService } from '../types';

/** @description create user in database & hash password */
export const createUser = async (input: UserInputService) => {
  const hashedPassword = await argon2.hash(input.password!);

  const dbUser = await db.user.findFirst({
    where: {
      id: input.email,
    },
  });

  if (!dbUser) {
    const user = await db.user.create({
      data: {
        email: input.email!,
        password: hashedPassword!,
        verified: false,
        profile: {
          create: {
            firstName: input.firstName,
            lastName: input.lastName,
          },
        },
        address: {
          create: {
            city: '',
            state: '',
            street: '',
            zipCode: '',
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return user;
  }
};

/** @description find user by id and it returns all user data included password */
export const findUserById = async (id: string) => {
  const user = await db.user.findFirst({
    where: {
      id,
      active: true,
    },
    include: {
      profile: true,
      address: true,
    },
  });

  return user;
};
/** @description find user by id and set verified:true  */
export const verifyEmail = async (id: string) => {
  await db.user.update({
    where: {
      id,
    },
    data: {
      verified: true,
    },
  });
};
/** @description find user by email and return user data  */
export const findUserByEmail = async (email: string) => {
  // return UserModal.findOne({ email });

  const user = await db.user.findFirst({
    where: {
      email,
      active: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

/** @description find user by id and update password rest code valid for only 10 minutes  */
export const updatePasswordResetCode = async (id: string, passwordRestCode: string | null) => {
  await db.user.update({
    where: {
      id,
      active: true,
    },
    data: {
      passwordRestCode,
      passwordRestExpires: String(Date.now() + 10 * 60 * 1000),
    },
  });
};
/** @description find user by id and update password and update updatedAt */
export const updatePassword = async (id: string, password: string) => {
  const hashedPassword = await argon2.hash(password!);

  await db.user.update({
    where: {
      id,
      active: true,
    },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });
};
/** @description return all users  */
export const getUsers = async (startIndex: number, startLimit: number, email?: string) => {
  const index = startIndex || 0;
  const limit = startLimit || 10;

  const allUsers = await db.user.findMany({
    skip: index,
    take: limit,
    where: {
      active: true,
      OR: email ? [{ email: { contains: email, mode: 'insensitive' } }] : undefined,
    },
    select: {
      id: true,
      email: true,
      verified: true,
      createdAt: true,
      password: false,
      verificationCode: false,
      order: true,

      profile: {
        select: {
          firstName: true,
          lastName: true,
          phoneNumber: true,
          gender: true,
        },
      },
    },
  });

  return allUsers;
};

/** @description find user by id and update its data does not update password*/
export const updateMe = async (id: string, updatedData: UpdateMeDataProps) => {
  const { email, firstName, city, state, street, zipCode, gender, lastName, phoneNumber } = updatedData;

  const user = await db.user.update({
    where: {
      id,
      active: true,
    },
    include: {
      profile: true,
      address: true,
    },
    data: {
      email,
      profile: {
        update: {
          firstName,
          lastName,
          gender,
          phoneNumber,
        },
      },
      address: {
        update: {
          city,
          state,
          street,
          zipCode,
        },
      },
    },
  });

  return {
    firstName: user.profile?.firstName,
    lastName: user.profile?.lastName,
    email: user.email,
    gender: user.profile?.gender,
    phoneNumber: user.profile?.phoneNumber,
    city: user.address?.city,
    state: user.address?.state,
    street: user.address?.street,
    zipCode: user.address?.zipCode,
  };
};

/** @description update user data but this one has more rules (does not update password) */
export const updateUser = async (email: string, updatedData: UpdateUserProps) => {
  const { active, city, firstName, gender, lastName, phoneNumber, role, state, street, verified, zipCode } =
    updatedData;
  const updatedUser = await db.user.update({
    where: {
      email,
    },
    include: {
      profile: true,
      address: true,
    },
    data: {
      email,
      active,
      role,
      verified,
      profile: {
        update: {
          firstName,
          lastName,
          gender,
          phoneNumber,
        },
      },

      address: {
        update: {
          city,
          state,
          street,
          zipCode,
        },
      },
    },
  });

  return {
    email: updatedUser.email,
    firstName: updatedUser.profile?.firstName,
    lastName: updatedUser.profile?.lastName,
    gender: updatedUser.profile?.gender,
    role: updatedUser.role,
    verified: updatedUser.verified,
    phoneNumber: updatedUser.profile?.phoneNumber,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
    active: updatedUser.active,
    street: updatedUser.address?.street,
    city: updatedUser.address?.city,
    state: updatedUser.address?.state,
    zipCode: updatedUser.address?.zipCode,
  };
};

/** @description disable user in database */
export const deleteMe = async (id: string) => {
  const deletedUser = await db.user.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });

  return !deletedUser.active;
};
/** @description disable user in database */
export const deleteUser = async (email: string) => {
  const user = await db.user.update({
    where: {
      email,
    },
    data: {
      active: false,
    },
  });

  return user;
};

/** @description restore deleted user */
export const restoreUser = async (email: string) => {
  const user = await db.user.update({
    where: {
      email,
    },
    data: {
      active: true,
    },
  });

  return user.active;
};
