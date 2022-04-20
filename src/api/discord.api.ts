import axios from 'axios';
import { environment } from './environment';

export interface TaskData {
  role: string;
  description: string;
  name: string;
}

export const oauthGetToken = (code: string) => {
  const params = new URLSearchParams();
  params.append('client_id', environment.discordClientId);
  params.append('client_secret', environment.discordClientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', environment.discordRedirectUri);
  params.append('scope', 'identify');
  params.append('code', code);
  return fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
  })
    .then((response) => response.json())
    .then((data) => data.access_token);
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
