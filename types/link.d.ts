interface LinkSubmitPayload {
  url: string;
  title: string;
  iconUrl?: string;
  iconColor?: string;
}

interface LinkEditPayload {
  ID: string;
  url: string;
  title: string;
  iconUrl?: string;
  iconColor?: string;
}

interface Link {
  ID: string;
  url: string;
  title: string;
  clickCount: string;
  iconUrl?: string;
  iconColor?: string;
}

interface LinkResponse {
  links: Link[];
}

interface IconInput {
  name: string;
  color: string;
}