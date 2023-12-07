interface LinkSubmitPayload {
  url: string;
  title: string;
  iconUrl?: string;
}

interface LinkEditPayload {
  ID: string;
  url: string;
  title: string;
  iconUrl?: string;
}

interface Link {
  ID: string;
  url: string;
  title: string;
  clickCount: string;
  iconUrl?: string;
}

interface LinkResponse {
  links: Link[];
}
