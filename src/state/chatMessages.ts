import { atom, selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Book } from "@/root/types";
import { Message } from "@/types";

const state = atom<Record<Book["embeddingCollectionName"], Message[]>>({ key: "chatMessagesState", default: {} });

const valueSelector = selector({
  key: "chatMessagesStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

const valueByCollectionNameSelector = selectorFamily<Message[], Book["embeddingCollectionName"] | undefined>({
  key: "chatMessagesStateValueByCollectionNameSelector",
  get: collectionName => {
    return ({ get }) => (collectionName ? get(state)[collectionName] ?? [] : []);
  }
});

export const chatMessagesState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector),
  useByCollectionName: (collectionName?: Book["embeddingCollectionName"]) => {
    return useRecoilValue(valueByCollectionNameSelector(collectionName));
  }
};
