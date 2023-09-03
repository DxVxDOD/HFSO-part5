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
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const blogToUpdate = action.payload;
      return state.map((blog) =>
        blog.id !== blogToUpdate.id ? blog : blogToUpdate,
      );
    },
    setBlog(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { addBlog, updateBlog, setBlog } = slice.actions;

export const initializeBlogs = (): AppThunk => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (blog: BlogT): AppThunk => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
    dispatch(dispalySuccess(`New blog: ${newBlog.title} by ${newBlog.author}`, 5000))
  };
};

export const addUpdatedBlog = (blog: BlogT, id: string): AppThunk => {
  return async (dispatch) => {
    const upToDateBlog = await blogService.update(id, blog);
    dispatch(updateBlog(upToDateBlog));
    dispatch(dispalySuccess(`New blog: ${upToDateBlog.title} by ${upToDateBlog.author}`, 5000))
  };
};

export const deleteBlog = (id: string): AppThunk => {
  return async (dispatch) => {
    await blogService.remove(id);
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export default slice.reducer;
