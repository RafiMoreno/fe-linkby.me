interface Profile {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null;
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  displayPicture: string;
}

interface ProfileEditPayload {
  displayName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
  displayPicture?: string;
}

interface ProfileResponse {
  profile: Profile;
}

interface ProfileTheme {
  primaryColor: string,
  secondaryColor: string,
}

interface ProfileState {
  loading: bool,
  profile: Profile | null,
  error: ErrorResponse | null,
  links:  Link[],
  linkBoxStyle: {
    color: string,
    backgroundColor: string,
    borderColor: string,
  },
  pageStyle: {
    backgroundColor: string
    color: string,
    borderColor: string,
  },
  theme: ProfileTheme
}



