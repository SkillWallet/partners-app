import axios from 'axios';
import { environment } from './environment';

export interface TaskData {
  role: string;
  description: string;
  name: string;
}

export const oauthGetToken = (code: string) => {
  const details = {
    client_id: environment.discordClientId,
    client_secret: environment.discordClientSecret,
    grant_type: environment.discordGrandType,
    code,
    redirect_uri: environment.discordRedirectUri,
  };

  const params = new URLSearchParams();

  for (const property in details) {
    if (property) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      params.append(encodedKey, encodedValue);
    }
  }

  return axios
    .post(`${environment.discordApiUrl}/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data.access_token);
};

export const getUser = (accessToken: string) => {
  return axios
    .get(`${environment.discordApiUrl}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
};

export interface DiscordMessageInputField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordMessage {
  title: string;
  url?: string;
  description: string;
  color?: string;
  fields?: DiscordMessageInputField[];
  image?: string;
}
export class DiscordMessageInput {
  author: {
    name: string;
    image: string;
  };

  message: DiscordMessage;

  footer: {
    text: string;
    image: string;
  };

  constructor(data: DiscordMessageInput) {
    this.author = data.author;
    this.footer = data.footer;
    this.message = data.message;
  }
}

export const postDiscordNotification = (webhookUrl: string, input: DiscordMessageInput) => {
  const { footer, author, message } = input;
  return axios
    .post(webhookUrl, {
      embeds: [
        {
          ...message,
          author: {
            name: author.name,
            icon_url: author.image,
          },
          footer: {
            text: footer.text,
            icon_url: footer.image,
          },
        },
      ],
    })
    .then((res) => res.data);
};
