import { FormEvent, useState } from "react";
import { BlogT } from "../types/blog.ts";

const BlogsForm = ({
  handleNewBlog,
}: {
  handleNewBlog: (
    e: FormEvent,
    newBlog: BlogT,
    setNewBlog: React.Dispatch<React.SetStateAction<BlogT>>,
  ) => Promise<void>;
}) => {
  const [newBlog, setNewBlog] = useState<BlogT>({
    author: "",
    title: "",
    url: "",
  });

  return (
    <form onSubmit={(e) => handleNewBlog(e, newBlog, setNewBlog)}>
      <div>
        Author
        <input
          type="text"
          name="Author"
          placeholder="Author"
          id="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        Title
        <input
          type="text"
          name="Title"
          placeholder="Title"
          id="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          name="Url"
          placeholder="Url"
          id="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button>Add blog</button>
    </form>
  );
};

export default BlogsForm;
