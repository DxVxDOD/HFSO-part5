import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Blog from './Blogs.tsx';

describe('Blog tests', () => {
  const blog = {
    title: 'MIDDELWARE USER EXTRACTION 1001',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
    id: '646e4ca4be8d8cdc58a9bb16',
  };

  test('renders content', async () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText(
      'MIDDELWARE USER EXTRACTION 1001 Michael Chan'
    );
    expect(element).toBeDefined();
  });
});
  