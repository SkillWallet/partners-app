import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { ParseSWErrorMessage } from '@utils/error-parser';
import { updateTransactionState } from '@store/ui-reducer';
import {
  ThunkArgs,
  ProviderEvent,
  ProviderThunkType,
  AsyncThunkConfig,
  AsyncThunkPayloadCreator,
  BaseThunkArgs,
  GetThunkAPI,
} from './web3.thunk.type';
import { EnableAndChangeNetwork } from './web3.network';

const DefaultProviders: Partial<BaseThunkArgs> = {
  updateTransactionStateAction: (state: string, dispatch) => {
    dispatch(updateTransactionState(state));
  },
};

export const Web3ThunkProviderFactory = <SWContractFunctions>(type: string, stateActions: BaseThunkArgs) => {
  return <Returned, ThunkArg = any>(
    args: ThunkArgs,
    contractAddress: (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => Promise<string>,
    thunk: AsyncThunkPayloadCreator<SWContractFunctions, Returned, ThunkArg>
  ): AsyncThunk<Returned, ThunkArg, AsyncThunkConfig> => {
    stateActions = {
      ...DefaultProviders,
      ...stateActions,
    };
    const typeName = `[${type}] ${(args as ProviderEvent).event || (args as ProviderThunkType).type}`;
    return createAsyncThunk<Returned, ThunkArg, AsyncThunkConfig>(typeName, async (arg, thunkAPI) => {
      try {
        const addressOrName = (await contractAddress(thunkAPI)) || (args as any)?.addressOrName;
        if (!addressOrName) {
          throw new Error(`Could not find addressOrName for ${type}`);
        }
        const contractProvider = await stateActions.provider(addressOrName, {
          event: (args as ProviderEvent).event,
          beforeRequest: () => EnableAndChangeNetwork(),
          transactionState: (state) => {
            if (stateActions.updateTransactionStateAction) {
              stateActions.updateTransactionStateAction(state, thunkAPI.dispatch);
            }
          },
        });
        return await thunk(contractProvider, arg, thunkAPI);
      } catch (error) {
        const message = ParseSWErrorMessage(error);
        if (stateActions.updateErrorStateAction) {
          stateActions.updateErrorStateAction(message, thunkAPI.dispatch);
        }
        return thunkAPI.rejectWithValue(message);
      }
    });
  };
};
