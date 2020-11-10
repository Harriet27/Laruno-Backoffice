import React, { useEffect, useState } from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../elements/Card/Card';
import { fetchGetAgents, fetchPostSingleImage } from '../../store/actions';
import ReactQuillTest from './ReactQuill';
import SingleImage from './SingleImage';
import MediaUrl from './MediaUrl';
import {
  Section,
  SectionOne,
  Span,
  WrapsField,
  Label,
  Input,
} from '../../elements/Styled/StyledTabs';
// --- Styled Components --- //

export default function Layout(props) {
  const dispatch = useDispatch();
  const {
    headline,
    onChange,
    subheadline,
    feature_onheader,
    feature_onpage,
    agent,
    handleSelectAgent,
    handleFeature,
    children,
    // --- upload image --- //
    formulir,
    setFormulir,
    // --- REACT HOOK FORM --- //
    register,
    errors,
  } = props;

  // --- Agents --- //
  const agents = useSelector((state) => state.agents.getAgents);

  useEffect(() => {
    dispatch(fetchGetAgents());
    // eslint-disable-next-line
  }, [dispatch]);

  let optionsAgents =
    agents !== null &&
    agents.data.map((item) => {
      return { key: item._id, value: item._id, label: item.name };
    });

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
      <SectionOne>
        <Card isNormal style={{ width: '100%' }}>
          <div style={{ padding: '30px 40px' }}>
            <div style={Styles.FlexBetween}>
              <WrapsField>
                <Label>
                  <Span>Headline </Span>
                </Label>
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
              <WrapsField>
                <Label>
                  <Span>Subheadline </Span>
                </Label>
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

              <WrapsField>
                <Label>
                  <Span>Agent</Span>
                </Label>
                <div>
                  <MultiSelect
                    overrideStrings={{
                      selectSomeItems: 'select role...',
                      allItemsAreSelected: 'Semua role dipilih',
                      selectAll: 'Select All',
                      search: 'Search',
                    }}
                    options={optionsAgents}
                    selected={agent}
                    onSelectedChanged={handleSelectAgent}
                  />
                </div>
              </WrapsField>
            </div>
            <WrapsField fullwidth style={{ marginBottom: '100px' }}>
              <Label>
                <Span>Description</Span>
              </Label>

              <ReactQuillTest value={props.value} setValue={props.setValue} />
            </WrapsField>

            {/* Children untuk learn about  */}
            <React.Fragment>{children}</React.Fragment>

            {/* feature onpage */}
            <WrapsField fullwidth>
              <Label>
                <Span>Feature Onpage</Span>
              </Label>
              <div>
                <Input
                  as="textarea"
                  name="feature_onpage"
                  id="feature_onpage"
                  value={feature_onpage}
                  onChange={handleFeature}
                  placeholder="fetaure Onpage.."
                />
              </div>
            </WrapsField>

            {/* Feature On Header */}

            <WrapsField fullwidth>
              <Label>
                <Span>Feature Onheader</Span>
              </Label>
              <div>
                <Input
                  as="textarea"
                  name="feature_onheader"
                  id="feature_onheader"
                  value={feature_onheader}
                  onChange={handleFeature}
                  placeholder="feature onheader..."
                />
              </div>
            </WrapsField>

            {/* Image Bonus */}
            <WrapsField>
              <Label>
                <Span>Image Bonus</Span>
              </Label>
              <SingleImage
                id="image_bonus"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'image_bonus')}
              />

              {typeof formulir.image.image_bonus === 'object' ? null : (
                <div style={{ width: '150px' }}>
                  <img
                    width="100%"
                    src={formulir.image.image_bonus}
                    alt={formulir.image.image_bonus}
                  />
                </div>
              )}
            </WrapsField>

            <WrapsField>
              <Label>
                <Span>Header Media</Span>
              </Label>
              <MediaUrl
                id="media_url"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'media_url')}
              />

              {typeof formulir.image.media_url === 'object' ? null : (
                <video width="320" height="240" controls>
                  <source src={formulir.image.media_url} type="video/mp4" />
                  <source src={formulir.image.media_url} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              )}
            </WrapsField>
          </div>
        </Card>
      </SectionOne>
    </Section>
  );
}

const Styles = {
  FlexBetween: { display: 'flex', justifyContent: 'space-between' },
};
