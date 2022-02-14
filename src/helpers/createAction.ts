import type { IAction } from 'interfaces';

const createAction = <T extends string, P>(
  type: T,
  payload: P
): IAction<T, P> => ({
  type,
  payload,
});

export default createAction;
