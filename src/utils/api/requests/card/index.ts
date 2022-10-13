import { AxiosRequestConfig } from "axios";

import { api } from "../../instance";

interface RequestCardParams {
  params: { limit: number; offset: number };
  config?: AxiosRequestConfig;
}

export const requestCards = ({ params, config }: RequestCardParams) =>
  api.get<NamedAPIResourceList>(``, { params, ...config });

// TODO: named api for cards
