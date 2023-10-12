import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { setConnectionTypeCookiesValue } from "@/utils";

const state = atom<ConnectionTypes>({
  key: "connectionTypeState",
  default: "kai",
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        setConnectionTypeCookiesValue(newValue);
        window.location.reload();
      });
    }
  ]
});

const valueSelector = selector({
  key: "connectionTypeStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const connectionTypeState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
