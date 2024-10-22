import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  picture: string | null;
}

const initialState: UserState = {
  username: "",
  picture: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.picture = action.payload.picture;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
