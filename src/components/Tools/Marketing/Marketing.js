import React from 'react';
import Styled from 'styled-components';
import { DataImage } from './Data';
import Pagination from '@material-ui/lab/Pagination';
import { ButtonLink } from '../../../elements/Styled/StyledTabs';
const MainImage = Styled.div`
width: 20%;
padding: 10px;
margin: 20px 10px;
border-radius: 10px;
cursor: pointer;
box-shadow: -1px 0px 9px -2px #000000;
@media (max-width: 600px){
  width: 100%;
}
@media (min-width: 601px){
  width: 40%;
}
@media (min-width: 998px) {
  width: 20%;
}
&:hover{
  background: rgba(180, 180, 180, 0.6);
}
`;
export default function Marketing() {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 8;
  const [noOfPages] = React.useState(
    Math.ceil(DataImage.length / itemsPerPage)
  );
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <section style={{ display: 'flex', justifyContent: 'row' }}>
      <div style={{ width: '80%', border: '5px double gray', padding: '5px' }}>
        <h2
          style={{ textAlign: 'center', fontWeight: '500', color: '#393e46' }}
        >
          Facebook
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input
              style={{ width: '100%', padding: '5px', fontSize: '16px' }}
              type="text"
              placeholder="FB Pixel.."
            />
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
          }}
        >
          <h4 style={{ textAlign: 'center', margin: '5px 0' }}>
            <ButtonLink style={{ background: 'rgb(112,202,99)' }}>
              Save
            </ButtonLink>
            <ButtonLink>+ Ads</ButtonLink>
          </h4>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '100%',
                flexWrap: 'wrap',
              }}
            >
              {DataImage.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              ).map((item, index) => {
                return (
                  <MainImage key={index}>
                    <img
                      width="100%"
                      src={item.url}
                      alt={`forseasonCategory${index}`}
                    />
                    <div style={{ marginTop: '10px' }}>
                      <p style={{ fontWeight: '600' }}>{item.name}</p>
                    </div>
                  </MainImage>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Pagination
                count={noOfPages}
                defaultPage={1}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: '10px',
          width: '20%',
          border: '5px double gray',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        GUIDE
      </div>
    </section>
  );
}
