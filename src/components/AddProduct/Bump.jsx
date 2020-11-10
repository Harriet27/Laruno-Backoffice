import React, { useState } from 'react';
import Card from '../../elements/Card/Card';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import SingleImage from './SingleImage';
import { fetchPostSingleImage } from '../../store/actions';
import { Span, Label, Input } from '../../elements/Styled/StyledTabs';
// --- Styled Components --- //
const WrapsField = Styled.div`
    margin-bottom: 25px;
`;
const Section = Styled.div`
    padding: 50px 100px;
    line-height: 1.5;
    @media (max-width: 1000px) {
      padding: 40px
    }
`;
const Container = Styled.div`
    padding: 20px 30px;
`;
// --- Styled Components --- //

export default function Bump(props) {
  const dispatch = useDispatch();
  const {
    bump_name,
    onChange,
    bump_weight,
    bump_image,
    bump_price,
    formulir,
    setFormulir,
    bump_heading,
    bump_desc,
  } = props;

  // --- HandleChange upload Image --- //
  const handleChange = (e) => {
    let image = formulir.image;
    let field = e.target.id;
    image[field] = e.target.files[0];
    setFormulir({ image });
  };

  // --- handleSubmit Upload Image --- //
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    dispatch(fetchPostSingleImage(formulir, e, id, setFormulir));
  };
  return (
    <Section>
      <Card isNormal>
        <Container>
          <div>
            <React.Fragment>
              <WrapsField>
                <Label>
                  <Span>Bump Name</Span>
                </Label>
                <div>
                  <Input
                    type="text"
                    name="bump_name"
                    id="bump_name"
                    value={bump_name}
                    onChange={onChange}
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <Label>
                  <Span>Harga</Span>
                </Label>
                {/*  Styled for Rp */}
                <div style={Styles.PriceBorder}>
                  <div style={Styles.PriceRupiah}>
                    <div style={Styles.PriceRp}>Rp</div>
                  </div>
                  <Input
                    isPrice
                    type="number"
                    name="bump_price"
                    id="bump_price"
                    value={bump_price}
                    onChange={onChange}
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <Label>
                  <Span>Bump Weight</Span> (gr)
                </Label>
                <div>
                  <Input
                    type="number"
                    name="bump_weight"
                    id="bump_weight"
                    value={bump_weight}
                    onChange={onChange}
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <SingleImage
                  id="bump_image"
                  onChange={handleChange}
                  onSubmit={(e) => handleSubmit(e, 'bump_image')}
                />
              </WrapsField>
              <div style={Styles.ImageBorder}>
                <div style={{ width: '100px' }}>
                  {typeof formulir.image.bump_image === 'object' ? null : (
                    <img
                      width="100%"
                      src={formulir.image.bump_image}
                      alt={formulir.image.bump_image}
                    />
                  )}
                </div>
              </div>

              {/* Tambahan bump text dan bump sub headline */}
              <WrapsField>
                <Label>
                  <Span>Bump Heading</Span>
                </Label>
                <div>
                  <Input
                    type="text"
                    name="bump_heading"
                    id="bump_heading"
                    value={bump_heading}
                    onChange={onChange}
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <Label>
                  <Span>Bump Description</Span>
                </Label>
                <div>
                  <Input
                    type="text"
                    name="bump_desc"
                    id="bump_desc"
                    value={bump_desc}
                    onChange={onChange}
                  />
                </div>
              </WrapsField>
            </React.Fragment>
          </div>
        </Container>
      </Card>
    </Section>
  );
}

const Styles = {
  PriceBorder: {
    display: 'flex',
    border: '1px solid #ced4da',
    borderRadius: '3px',
  },
  PriceRupiah: {
    backgroundColor: '#e9ecef',
    width: '50px',
  },
  PriceRp: {
    textAlign: 'center',
    marginTop: '3px',
  },
  ImageBorder: {
    width: '100%',
    border: '1px dotted gray',
    height: '150px',
    marginBottom: '10px',
  },
};
