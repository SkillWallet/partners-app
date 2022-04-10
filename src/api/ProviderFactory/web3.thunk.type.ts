import { ThunkDispatch, AnyAction, AsyncThunkPayloadCreatorReturnValue } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { FallbackIfUnknown } from '@reduxjs/toolkit/dist/tsHelpers';

type Dispatch = ThunkDispatch<any, any, AnyAction>;

export interface BaseThunkArgs {
  provider: any;
  updateTransactionStateAction?: (state: string, dispatch: Dispatch) => void;
  updateErrorStateAction?: (error: string, dispatch: Dispatch) => void;
}

export interface ProviderEvent {
  type?: string;
  event: any;
}

export interface ProviderThunkType {
  type: string;
}

export type ThunkArgs = ProviderEvent | ProviderThunkType;

export interface AsyncThunkConfig {
  state?: any;
  dispatch?: Dispatch;
  extra?: any;
  rejectValue?: any;
  serializedErrorType?: any;
  pendingMeta?: any;
  fulfilledMeta?: any;
  rejectedMeta?: any;
}

type GetState<ThunkApiConfig> = ThunkApiConfig extends {
  state: infer State;
}
  ? State
  : any;
type GetExtra<ThunkApiConfig> = ThunkApiConfig extends {
  extra: infer Extra;
}
  ? Extra
  : any;
type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
  dispatch: Dispatch;
}
  ? FallbackIfUnknown<Dispatch, ThunkDispatch<GetState<ThunkApiConfig>, GetExtra<ThunkApiConfig>, AnyAction>>
  : ThunkDispatch<GetState<ThunkApiConfig>, GetExtra<ThunkApiConfig>, AnyAction>;
export type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
  GetState<ThunkApiConfig>,
  GetExtra<ThunkApiConfig>,
  GetDispatch<ThunkApiConfig>,
  GetRejectValue<ThunkApiConfig>,
  GetRejectedMeta<ThunkApiConfig>,
  GetFulfilledMeta<ThunkApiConfig>
>;
type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
  rejectValue: infer RejectValue;
}
  ? RejectValue
  : any;
type GetFulfilledMeta<ThunkApiConfig> = ThunkApiConfig extends {
  fulfilledMeta: infer FulfilledMeta;
}
  ? FulfilledMeta
  : any;
type GetRejectedMeta<ThunkApiConfig> = ThunkApiConfig extends {
  rejectedMeta: infer RejectedMeta;
}
  ? RejectedMeta
  : any;

export type AsyncThunkPayloadCreator<ContractFunction, Returned, ThunkArg, ThunkApiConfig extends AsyncThunkConfig = any> = (
  contract: ContractFunction,
  arg?: ThunkArg,
  thunkAPI?: GetThunkAPI<ThunkApiConfig>
) => Promise<AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig>>;
