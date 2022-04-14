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

export const sendDiscordNotificaiton = (webhookUrl: string, taskData: TaskData) => {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'content',
    `Hello! \n A new task called "${taskData.name}" was created. \n Description: ${taskData.description} \n Role: ${taskData.role}`
  );
  return axios.post(webhookUrl, bodyFormData).then((res) => res.data);
};
