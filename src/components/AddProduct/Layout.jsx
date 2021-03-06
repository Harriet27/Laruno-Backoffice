import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
// import Card from '../../elements/Card/Card';
import Card from '@material-ui/core/Card';
import {
  fetchGetAgents,
  fetchPostSingleImage,
  fetchPostMediaImage,
} from '../../store/actions';
import ReactQuillTest from './ReactQuill';
import SingleImage from './SingleImage';
import MediaUrl from './MediaUrl';
import Styled from 'styled-components';
import {
  Section,
  SectionOne,
  Span,
  WrapsField,
  Label,
  Input,
} from '../../elements/Styled/StyledTabs';
// --- Styled Components --- //

const DescriptionStyle = Styled.div`
margin-top: 10px;
@media (max-width: 700px){
  margin-top: 140px; 
}
`;

export default function Layout(props) {
  const dispatch = useDispatch();
  const {
    headline,
    onChange,
    subheadline,
    feature_onheader,
    feature_onpage,
    agent,
    handleSelect,
    handleFeature,
    children,
    isAgent,
    // --- upload image --- //
    formulir,
    setFormulir,
    // --- REACT HOOK FORM --- //
    register,
    errors,
  } = props;

  // --- Agents --- //
  const agents = useSelector((state) => state.agents.getAgents);
  console.log(agents, 'agent');
  useEffect(() => {
    dispatch(fetchGetAgents());
    // eslint-disable-next-line
  }, [dispatch]);
  const data = [{ key: 1, value: 'Loading', label: 'Loading...' }];
  const options =
    agents === null
      ? data.map((item) => {
          return {
            item: item.key,
            value: item.value,
            label: item.label,
            isDisabled: true,
          };
        })
      : agents.data.map((item) => {
          return { key: item._id, value: item._id, label: item.name };
        });

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

  return (
    <div>
      <SectionOne>
        <Card>
          <div style={{ padding: '30px 40px' }}>
            <WrapsField fullwidth>
              <div>
                <Input
                  type="text"
                  name="headline"
                  id="headline"
                  value={headline}
                  onChange={onChange}
                  placeholder="Headline..."
                />
              </div>
            </WrapsField>

            {/* subheadline */}
            <WrapsField fullwidth>
              <div>
                <Input
                  type="text"
                  name="subheadline"
                  id="subheadline"
                  value={subheadline}
                  onChange={onChange}
                  placeholder="Short Description..."
                />
              </div>
            </WrapsField>

            <WrapsField fullwidth>
              <div>
                <Select
                  isMulti
                  name="colors"
                  value={isAgent || ''}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSelect}
                  placeholder="Select agent.."
                />
              </div>
            </WrapsField>

            <WrapsField fullwidth style={{ marginBottom: '50px' }}>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Span>Description</Span>
              </div>
              <ReactQuillTest value={props.value} setValue={props.setValue} />
            </WrapsField>

            {/* Children untuk learn about  */}
            <DescriptionStyle>
              <React.Fragment>{children}</React.Fragment>
            </DescriptionStyle>

            {/* feature onpage */}
            <WrapsField fullwidth>
              <div>
                <Input
                  as="textarea"
                  rows="5"
                  name="feature_onpage"
                  id="feature_onpage"
                  value={feature_onpage}
                  onChange={handleFeature}
                  placeholder="Feature onpage.."
                />
              </div>
            </WrapsField>

            {/* Feature On Header */}

            <WrapsField fullwidth>
              <div>
                <Input
                  rows="5"
                  as="textarea"
                  name="feature_onheader"
                  id="feature_onheader"
                  value={feature_onheader}
                  onChange={handleFeature}
                  placeholder="Feature onheader..."
                />
              </div>
            </WrapsField>

            {/* Image Bonus */}
            <WrapsField>
              <Label>
                <Span>Image Bonus</Span>
              </Label>
              <div>
                <SingleImage
                  id="image_bonus"
                  onChange={(e) => handleChange(e, 'image_bonus')}
                  isLoading={state.isLoading}
                />
              </div>
              {typeof formulir.image.image_bonus === 'object' ? null : (
                <div style={{ width: '125px' }}>
                  <img
                    width="100%"
                    src={formulir.image.image_bonus}
                    alt={formulir.image.image_bonus}
                  />
                </div>
              )}
            </WrapsField>
          </div>
        </Card>
      </SectionOne>
    </div>
  );
}

const Styles = {
  FlexBetween: { display: 'flex', justifyContent: 'space-between' },
};
