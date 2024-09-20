/**
 * Base type for user-related data.
 *
 * This type defines the common properties used for both user creation and user representation.
 */
export type UserBase = {
  /** User's national id */
  national_id: string;

  /** User's first name */
  first_name: string;

  /** User's last name */
  last_name: string;

  /** User's email address */
  email: string;
};

/**
 * Type representing a user with additional properties.
 *
 * This type extends UserBase with additional fields required for user management.
 */
export type User = UserBase & {
  /** Hashed password for secure storage */
  password_digest: string;

  /** Timestamp when the user was created (ISO 8601 format) */
  created_at?: string;

  /** Timestamp when the user was last updated (ISO 8601 format) */
  updated_at?: string;
};

/**
 * Type for user data required for creating a new user.
 *
 * This type extends UserBase with the password field used during user creation.
 */
export type UserData = UserBase & {
  /** Plain text password used for hashing and storage */
  password: string;
};
