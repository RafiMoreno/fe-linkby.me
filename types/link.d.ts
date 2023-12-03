interface LinkSubmitPayload {
  url: string;
  title: string;
  iconUrl?: string;
}

interface Link {
  id: string;
  url: string;
  title: string;
  clickCount: string;
  iconUrl?: string;
}

interface LinkResponse {
  links: Link[];
}
