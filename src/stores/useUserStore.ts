import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ListFragment$data } from "../component/List/__generated__/ListFragment.graphql";

interface UserState {
  user: ListFragment$data | null;
  searchFirst: number;
  searchPage: number;
  searchValue: string;
}

interface UserStoreAction {
  setUser: (data: UserState) => void;
  clearUser: () => void;
}

const initialState = {
  user: null,
  searchFirst: 0,
  searchPage: 0,
  searchValue: "",
};

const userStore = create<UserState & UserStoreAction>()(
  immer(
    persist(
      (set, get) => ({
        ...initialState,
        setUser: (data): void =>
          set((state) => {
            state.user = data.user;
            state.searchFirst = data.searchFirst;
            state.searchPage = data.searchPage;
            state.searchValue = data.searchValue;
          }),
        clearUser: (): void => {
          get().setUser({
            user: null,
            searchFirst: 0,
            searchPage: 0,
            searchValue: "",
          });
        },
      }),
      {
        name: "user",
      }
    )
  )
);

export default userStore;
