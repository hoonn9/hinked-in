export interface AuthFederateProfile {
  profileId: string;
  email: string;
  name: {
    lastName?: string;
    firstName?: string;
  };
}
