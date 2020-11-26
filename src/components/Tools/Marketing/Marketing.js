import React from 'react';
import Styled from 'styled-components';
import { DataImage } from './Data';
import Pagination from '@material-ui/lab/Pagination';
import { ButtonLink } from '../../../elements/Styled/StyledTabs';
import ModalFbAds from './ModalFbAds';
import DetailFbAds from './DetailFbAds';
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
        <div style={Styles.FlexColumn}>
          <div style={Styles.FlexRow}>
            <input
              style={Styles.FacebookPixel}
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
            <div style={Styles.ButtonAds}>
              <ButtonLink style={{ background: 'rgb(112,202,99)' }}>
                Save
              </ButtonLink>
              <ModalFbAds buttonLabel={<ButtonLink>+ Ads</ButtonLink>} />
            </div>
          </h4>
          <div>
            <div style={Styles.DataImage}>
              {DataImage.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              ).map((item, index) => {
                return (
                  <MainImage key={index}>
                    <DetailFbAds
                      buttonLabel={
                        <>
                          <img
                            width="100%"
                            src={item.url}
                            alt={`forseasonCategory${index}`}
                          />
                          <div style={{ marginTop: '10px' }}>
                            <p style={{ fontWeight: '600' }}>{item.name}</p>
                          </div>
                        </>
                      }
                    />
                  </MainImage>
                );
              })}
            </div>
            <div style={Styles.Pagination}>
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
      <div style={Styles.Guide}>GUIDE</div>
    </section>
  );
}

const Styles = {
  Guide: {
    marginLeft: '10px',
    width: '20%',
    border: '5px double gray',
    textAlign: 'center',
    padding: '20px',
  },
  Pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  DataImage: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    flexWrap: 'wrap',
  },
  ButtonAds: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  FacebookPixel: { width: '100%', padding: '5px', fontSize: '16px' },
  FlexColumn: { display: 'flex', flexDirection: 'column' },
  FlexRow: { display: 'flex', flexDirection: 'row' },
};
