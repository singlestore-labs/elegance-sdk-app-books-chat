import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Book } from "@/root/types";
import { chatBooksState } from "./chatBooks";

const state = atom<Book | undefined>({ key: "activeChatBookState", default: undefined });

const valueSelector = selector({
  key: "activeChatBookStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

const valueByIdSelector = selector<Book["id"] | undefined>({
  key: "activeChatBookStateValueByIdSelector",
  get: ({ get }) => get(state)?.id,
  set: ({ set, get }, value) => {
    const book = get(chatBooksState.atom).find(book => book.id === value);
    set(state, book);
  }
});

const embeddingCollectionName = selector<Book["embeddingCollectionName"] | undefined>({
  key: "activeChatBookStateEmbeddingCollectionName",
  get: ({ get }) => get(state)?.embeddingCollectionName
});

export const activeChatBookState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector),
  useId: () => useRecoilValue(valueByIdSelector),
  useSetValueById: () => useSetRecoilState(valueByIdSelector),
  useEmbeddingCollectionName: () => useRecoilValue(embeddingCollectionName)
};
