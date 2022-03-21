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

export const sendDiscordNotificaiton = (taskData: TaskData) => {
  const bodyFormData = new FormData();
  bodyFormData.append(
    'content',
    `Hello! \n A new task called "${taskData.name}" was created. \n Description: ${taskData.description} \n Role: ${taskData.role}`
  );
  return axios
    .post(`${environment.discordWebHookUrl}/${environment.discordWebHookId}/${environment.discordWebHookToken}`, bodyFormData)
    .then((res) => res.data);
};
