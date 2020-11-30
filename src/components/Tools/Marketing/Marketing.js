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
    <section>
      <div>
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <div>
            <div>
              {DataImage.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              ).map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: '20px',
                      background: '#F2F5F7',
                      fontSize: '14px',
                      borderRadius: '5px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundImage: `url(${item.url})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: '50%',
                          backgroundSize: 'cover',
                          margin: '10px',
                          borderRadius: '10%',
                        }}
                      ></div>
                      <div style={{ padding: 20 }}>
                        <div style={Styles.isName}>
                          Omset meningkat dikala Pandemi
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '10px',
                          }}
                        >
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <div style={{ width: '25px' }}>
                              <img
                                style={{ width: '100%' }}
                                src="https://www.flaticon.com/svg/static/icons/svg/889/889844.svg"
                                alt="click"
                              />
                            </div>
                            120 Click
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginTop: '5px',
                            }}
                          >
                            <div style={{ width: '25px' }}>
                              <img
                                style={{ width: '100%' }}
                                src="https://www.flaticon.com/svg/static/icons/svg/3208/3208786.svg"
                                alt="views"
                              />
                            </div>
                            100 Views
                          </div>
                        </div>

                        {/* <div style={Styles.Link}>
                          https://app.orderonline.id/contacts/
                        </div> */}
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex' }}>
                          <div style={Styles.isUnCheck}>
                            Blog <i className="fa fa-times"></i>
                          </div>
                          <div style={Styles.isCheck}>
                            Fulfillment <i className="fa fa-check"></i>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          <span style={Styles.isTopic}>Bisnis</span>
                          <span style={Styles.isTopic}>Financial</span>
                          <span style={Styles.isTopic}>
                            Personal Development
                          </span>
                        </div>
                      </div>
                      {/* <div style={{ padding: 20 }}>
                        <p>Click: 100</p>
                        <p>view: 100</p>
                      </div> */}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        padding: '10px',
                      }}
                    >
                      <ModalFbAds
                        buttonLabel={
                          <button style={Styles.isButtonNew}>Add New</button>
                        }
                      />

                      <button style={Styles.isButtonEdit}>Edit</button>
                      <button style={Styles.isButtonDelete}>Delete</button>
                      {/* <button style={Styles.isButton}>ON/OFF</button> */}
                    </div>
                  </div>
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
      {/* <div style={Styles.Guide}>GUIDE</div> */}
    </section>
  );
}

const Styles = {
  Guide: {
    marginLeft: '10px',
    width: '20%',
    textAlign: 'center',
    padding: '20px',
    height: '600px',
  },
  Pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  DataImage: {},
  ButtonAds: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  FacebookPixel: { width: '100%', padding: '5px', fontSize: '16px' },
  FlexColumn: { display: 'flex', flexDirection: 'column' },
  FlexRow: { display: 'flex', flexDirection: 'row' },
  isButtonNew: {
    background: '#9088d4',
    border: 'none',
    borderRadius: '5%',
    padding: '5px 10px',
    fontWeight: '500',
    color: 'white',
    width: '100px',
    marginRight: '10px',
  },
  isButtonEdit: {
    background: '#0098DA',
    border: 'none',
    borderRadius: '5%',
    padding: '5px 10px',
    fontWeight: '500',
    color: 'white',
    width: '100px',
    marginRight: '10px',
  },
  isButtonDelete: {
    background: '#d11a2a',
    border: 'none',
    borderRadius: '5%',
    padding: '5px 10px',
    fontWeight: '500',
    color: 'white',
    width: '100px',
  },
  isName: {
    // background: '#e8e8e8',
    // marginBottom: '20px',
    color: '#03c4a1',
    // padding: '.1em .5em',
    // borderRadius: '30px',
    // borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '14px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  Link: {
    // background: '#e8e8e8',

    color: '#9ab3f5',
    // padding: '.1em .5em',
    // borderRadius: '30px',
    // borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  isCheck: {
    background: '#e8e8e8',
    marginBottom: '20px',
    color: '#05dfd7',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '14px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },

  isUnCheck: {
    background: '#e8e8e8',
    marginBottom: '20px',
    color: '#a37eba',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '14px',
    maxWidth: '100%',
    fontWeight: 'bold',
    marginRight: '5px',
  },
  isTopic: {
    background: 'rgb(230,230,230)',
    color: 'black',
    padding: '.5em .5em',
    margin: '.5em',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    // border: '3px dotted #bbb',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    maxWidth: '100%',
    marginBottom: '5px',
  },
};
