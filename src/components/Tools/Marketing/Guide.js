import React from 'react';

export default function Guide() {
  const data = [
    {
      url:
        'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    },
    {
      url:
        'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    },
  ];
  return (
    <>
      {data.map((item) => {
        return (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <video width="100%" height="100%" controls>
              <source src={item.url} type="video/mp4" />
              <source src={item.url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <div
              style={{
                // fontWeight: '400',
                background: '#e8e8e8',
                color: '#5c6e91',
                padding: '10px',
                // 5c6e91
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                Part 1 create Facebook Pixel
              </div>
              <div style={{ fontSize: '12px' }}>By: Admin Rzt-7</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
