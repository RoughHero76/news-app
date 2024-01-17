import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const NewsApp = () => {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const markNewsAsRead = (id) => {
    setNews((prevNews) => {
      const updatedNews = [...prevNews];
      const newsIndex = updatedNews.findIndex((article) => article.id === id);
      if (newsIndex !== -1 && !updatedNews[newsIndex].read) {
        updatedNews[newsIndex].read = true;

        // Update local storage with all read news IDs
        const allReadNewsIds = updatedNews.filter((article) => article.read).map((article) => article.id);
        localStorage.setItem('readNews', JSON.stringify(allReadNewsIds));
      }
      return updatedNews;
    });
  };
  useEffect(() => {
    const fetchedNews = [
      {
        id: 1,
        title: 'News 1',
        SubHeading: 'subHeading',
        publishedDate: '7 July 08:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 2,
        title: 'News 2',
        SubHeading: 'subHeading',
        publishedDate: '8 July 08:00',
        content: 'This desc of News; This test is for bigger news descripation to see how the container would react but bigger description is writing is not easy This desc of News; This test is for bigger news descripation to see how the container would react but bigger description is writing is not easy This desc of News; This test is for bigger news descripation to see how the container would react but bigger description is writing is not easy This desc of News; This test is for bigger news descripation to see how the container would react but bigger description is writing is not easyThis desc of News; This test is for bigger news descripation to see how the container would react but bigger description is writing is not easy',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 3,
        title: 'News 3',
        SubHeading: 'subHeading',
        publishedDate: '9 July 22:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 4,
        title: 'News 4',
        SubHeading: 'subHeading',
        publishedDate: '10 July 08:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 5,
        title: 'News 5',
        SubHeading: 'subHeading',
        publishedDate: '10 July 15:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 6,
        title: 'News 6',
        SubHeading: 'subHeading',
        publishedDate: '10 July 18:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 7,
        title: 'News 7',
        SubHeading: 'subHeading',
        publishedDate: '14 July 08:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 8,
        title: 'News 8',
        SubHeading: 'subHeading',
        publishedDate: '13 July 10:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
      {
        id: 9,
        title: 'News 9',
        SubHeading: 'subHeading',
        publishedDate: '14 July 11:00',
        content: 'This desc of News',
        read: false,
        author_name: 'Author 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
      },
    ];
    const storedReadNews = JSON.parse(localStorage.getItem('readNews')) || [];
    const unreadNews = fetchedNews.filter((article) => !storedReadNews.includes(article.id));
    const readNews = fetchedNews.filter((article) => storedReadNews.includes(article.id));

    const updatedNews = [
      ...unreadNews.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)),
      ...readNews.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)),
    ];

    setNews(updatedNews);
    storedReadNews.forEach((id) => {
      markNewsAsRead(id);
    });
  }, []);

  const pervious = () => {
    const prevIndex = (currentNewsIndex - 1 + news.length) % news.length;
    setCurrentNewsIndex(prevIndex);
    markAsRead(prevIndex);
  };

  const next = () => {
    const nextIndex = (currentNewsIndex + 1) % news.length;
    markAsRead(currentNewsIndex);
    setCurrentNewsIndex(nextIndex);
  };
  const markAsRead = (index) => {
    if (!news[index].read) {
      markNewsAsRead(news[index].id);
      const readNewsIds = news.filter((article) => article.read).map((article) => article.id);
      localStorage.setItem('readNews', JSON.stringify(readNewsIds));
    }
  };

  return (
    <div style={mainContainerStyle}>
      <div style={containerStyle}>
        {news.length > 0 ? (
          <div style={newsStyle}>
            <h1>{news[currentNewsIndex].title}</h1>
            <hr style={{ border: '1px solid #000', width: '100%', margin: '10px auto' }} />
            <h3>{news[currentNewsIndex].SubHeading}</h3>
            <hr style={{ width: '50%' }} />
            <img src={news[currentNewsIndex].image} alt="img" style={{ maxWidth: '50%', height: '50%', marginBottom: '10px' }} />
            <p style={{ textAlign: 'justify' }}>
              {isContentExpanded ? news[currentNewsIndex].content : `${news[currentNewsIndex].content.slice(0, 200)}...`}
              {news[currentNewsIndex].content.length > 200 && (
                <Button onClick={() => setIsContentExpanded(!isContentExpanded)} variant="text" color="primary" startIcon={<ReadMoreIcon />}>
                  {isContentExpanded ? 'Read Less' : 'Read More'}
                </Button>
              )}
            </p>
            <p style={{ opacity: 0.7 }}>Author: {news[currentNewsIndex].author_name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ opacity: 0.7 }}>
                {news[currentNewsIndex].read ? (
                  <>
                    Read <DoneAllIcon style={{ verticalAlign: 'middle', marginLeft: '5px', marginBottom: '5px', opacity: 0.7 }} />
                  </>
                ) : (
                  'Unread'
                )}
              </p>
              <p style={{ opacity: 0.7 }}>{news[currentNewsIndex].publishedDate}</p>
            </div>
           
          </div>
        ) : (
          <p>No news available.</p>
        )}

        {news.every((article) => article.read) && (
          <p>All news has been read!</p>
        )}

        <Stack direction="row" spacing={5} justifyContent="center">
          <Button onClick={pervious} disabled={news.length === 0} variant="outlined" startIcon={<SendIcon sx={{ transform: 'scaleX(-1)' }} />}>
            Previous
          </Button>
          <Button onClick={next} disabled={news.length === 0} variant="contained" endIcon={<SendIcon />}>
            Next
          </Button>
        </Stack>
      </div>
    </div>
  );
};


const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const newsStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  margin: '10px',
};

const mainContainerStyle = {

  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  maxWidth: '800px',
  margin: '0 auto',
};

export default NewsApp;
