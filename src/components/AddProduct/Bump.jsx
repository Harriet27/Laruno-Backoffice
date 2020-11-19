import React, { useState } from 'react';
// import Card from '../../elements/Card/Card';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import SingleImage from './SingleImage';
import { fetchPostSingleImage } from '../../store/actions';
import { Span, Label, Input } from '../../elements/Styled/StyledTabs';
// --- Styled Components --- //
const WrapsField = Styled.div`
    margin-bottom: 10px;
`;

const Section = Styled.div`
    padding: 50px 100px;
    line-height: 1.5;
    @media (max-width: 1000px) {
      padding: 40px
    }
`;
const Container = Styled.div`
    padding: 30px 40px;
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

  const [state, setState] = useState({
    isLoading: false,
  });
  const handleChange = (e, id) => {
    let image = formulir.image;
    let field = e.target.id;
    image[field] = e.target.files[0];
    setFormulir({ image });
    setState({
      isLoading: true,
    });
    dispatch(fetchPostSingleImage({ formulir, e, id, setFormulir, setState }));
    e.target.type = 'text';
    e.target.type = 'file';
  };
  console.log({ formulir }, 'formulir');

  return (
    <div>
      <Card>
        <Container>
          <div>
            <React.Fragment>
              <WrapsField>
                <div>
                  <Input
                    type="text"
                    name="bump_name"
                    id="bump_name"
                    value={bump_name}
                    onChange={onChange}
                    placeholder="Bump Name"
                  />
                </div>
              </WrapsField>

              <WrapsField>
                {/*  Styled for Rp */}
                <div style={Styles.PriceBorder}>
                  <div style={Styles.PriceRupiah}>
                    <div style={Styles.PriceRp}>Rp</div>
                  </div>
                  <Input
                    isPrice
                    type="text"
                    name="bump_price"
                    id="bump_price"
                    value={bump_price}
                    onChange={onChange}
                    placeholder="1000.XXX.XXX"
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <div>
                  <Input
                    type="text"
                    name="bump_weight"
                    id="bump_weight"
                    value={bump_weight}
                    onChange={onChange}
                    placeholder="Bump weight"
                  />
                </div>
              </WrapsField>

              {/* Tambahan bump text dan bump sub headline */}
              <WrapsField>
                <div>
                  <Input
                    type="text"
                    name="bump_heading"
                    id="bump_heading"
                    value={bump_heading}
                    onChange={onChange}
                    placeholder="Bump Heading"
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <div>
                  <Input
                    as="textarea"
                    rows="5"
                    name="bump_desc"
                    id="bump_desc"
                    value={bump_desc}
                    onChange={onChange}
                    placeholder="Bump Description"
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <div>
                  <SingleImage
                    id="bump_image"
                    onChange={(e) => handleChange(e, 'bump_image')}
                    isLoading={state.isLoading}
                  />
                </div>
              </WrapsField>

              <div style={{ width: '125px' }}>
                {typeof bump_image === 'object' ? null : (
                  <img width="100%" src={bump_image} alt={bump_image} />
                )}
              </div>
            </React.Fragment>
          </div>
        </Container>
      </Card>
    </div>
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
