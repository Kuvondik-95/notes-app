export enum Message {
  // Auth
  TOKEN_NOT_EXIST = 'Token does not exist!',
  NOT_AUTHENTICATED = 'You are not authenticated!',

  // Member
  NICK_ALREADY_EXISTS = 'This nick is already taken!',
  PHONE_ALREADY_EXISTS = 'This phone number is already registered!',
  MEMBER_NOT_FOUND = 'Member not found!',
  WRONG_PASSWORD = 'Wrong password!',
  MEMBER_BLOCKED = 'Your account has been blocked!',

  UPDATE_FAILED = 'Failed to update member!',
  REMOVE_FAILED = 'Failed to remove member!',

  // General
  SOMETHING_WENT_WRONG = 'Something went wrong!',
}
