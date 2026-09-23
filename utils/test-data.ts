export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function generateUserData(): UserData {
  const timestamp = Date.now();
  
  return {
    firstName: 'Ksenia',
    lastName: 'Unger',
    email: `testuser_${timestamp}@gmail.com`,
    password: 'Password123',
  };
}