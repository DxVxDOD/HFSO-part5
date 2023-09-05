import { createSlice } from "@reduxjs/toolkit";
import { BlogT } from "../types/blog";
import blogService from "../services/blog";
import { AppThunk } from "../app/store";
import { dispalySuccess } from "./notificationReducer";

const initialState = [] as BlogT[];

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    set(state, action) {
      state = action.payload;
      return state;
    },
    create(state, action) {
      state.push(action.payload);
    },
  },
});

const { set, create } = slice.actions;

export const initializeBlogs = (): AppThunk => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (blog: BlogT): AppThunk => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(create(newBlog));
    dispatch(
      dispalySuccess(`New blog: ${newBlog.title} by ${newBlog.author}`, 5000),
    );
  };
};

export const addUpdatedBlog = (blog: BlogT, id: string): AppThunk => {
  return async (dispatch) => {
    const updatingBlog = { ...blog, likes: blog.likes! + 1 };
    const upToDateBlog = await blogService.update(id, updatingBlog);
    dispatch(initializeBlogs());
    dispatch(
      dispalySuccess(
        `New blog: ${upToDateBlog.title} by ${upToDateBlog.author}`,
        5000,
      ),
    );
  };
};

export const deleteBlog = (id: string): AppThunk => {
  return async (dispatch) => {
    await blogService.remove(id);
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export default slice.reducer;
