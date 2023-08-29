import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  let container: HTMLElement
  let mockHandler: jest.Mock

  beforeEach(() => {
    container = render(<Blog blog={blog} veiw={mockHandler} />).container;
  })

  test('renders content', async () => {
    const div = container.querySelector('.blog')

    screen.debug(container);

    expect(div).toHaveTextContent('MIDDELWARE USER EXTRACTION 1001');
    expect(div).toHaveTextContent('Michael Chan');
  });

  test('url and likes shown after button click', async () => {
    const div = container.querySelector('.blog')

    mockHandler = jest.fn();
    const user = userEvent.setup();

    let buttonText: string
    if (screen.getByText('view')) {
      buttonText = 'view'
    } else buttonText = 'hide'

    const button = screen.getByText(`${buttonText}`);
    await user.click(button)

    screen.debug(container);

    expect(div).toHaveTextContent('17')
    expect(div).toHaveTextContent('https://reactpatterns.com/')
  })
});
  