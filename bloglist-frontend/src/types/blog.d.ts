type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type Blog = {
	title: string;
	author: string;
	url: string;
	likes: number;
	id: number;
	user: string
};

type BlogT = Optional<Blog, 'likes' | 'id' | 'user'>

export {BlogT}