import { useEffect, useState } from 'react';
import EmojiParty from './examples/emojiParty/emojiParty';

const pages = ['home','emojiParty'] as const;
type Page = (typeof pages)[number];

function getComponent(page: Page) {
  switch (page) {
    case 'emojiParty':
      return <EmojiParty />;
  }
}

function getPage() {
  if (typeof window !== 'undefined') {
    const queryParams = new URLSearchParams(window.location.search);
    const pageQueryParam = queryParams.get('page');
    if (pageQueryParam && pages.includes(pageQueryParam as Page)) {
      return pageQueryParam as Page;
    }
  }
  return 'home';
}

function setPageQueryParam(page: Page) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(
      null,
      '',
      `?page=${page}` + window.location.hash,
    );
  }
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage());
  useEffect(() => setPageQueryParam(page), [page]);

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-pages">
        </div>
      </div>
      {getComponent(page)}
    </div>
  );
}
