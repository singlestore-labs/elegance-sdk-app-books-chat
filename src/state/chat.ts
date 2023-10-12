import { DefaultValue, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

type ChatState = { isLoading: boolean; isAILoading: boolean };

const state = atom<ChatState>({ key: "chatState", default: { isLoading: false, isAILoading: false } });

const valueSelector = selector({
  key: "chatStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

const isAILoading = selector({
  key: "chatStateIsAILoading",
  get: ({ get }) => get(state).isAILoading,
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) return value;
    return set(state, state => ({ ...state, isAILoading: value }));
  }
});

export const chatState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector),
  useIsAILoading: () => useRecoilValue(isAILoading),
  useSetIsAILoading: () => useSetRecoilState(isAILoading)
};
