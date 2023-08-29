import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import Blog from './Blogs.tsx';

describe('Blog tests', () => {
  const blog = {
    title: "MIDDELWARE USER EXTRACTION 1001",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 17,
    user: {
      username: "David",
      name: "David Orban Jozsef",
    },
    id: "64b5a7eea29f66d8f8d5f3ca"
  };

  test('renders content', async () => {

    const mockHandler = jest.fn();

    const {container} = render(<Blog blog={blog} veiw={mockHandler} />);

    // const user = userEvent.setup();
    // const button = screen.getByText('view');
    // await user.click(button)

    // const div = container.querySelector('.blog')

    screen.debug(container);

    expect(container).toHaveTextContent('MIDDELWARE USER EXTRACTION 1001');
    expect(container).toHaveTextContent('Michael Chan');
  });
});
  