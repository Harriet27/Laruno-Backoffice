import React, { useState } from 'react';
import {
  Form,
  Section,
  SectionOne,
  Span,
  WrapsField,
  Label,
  Input,
} from '../../elements/Styled/StyledTabs';
import { fetchPostSingleImage } from '../../store/actions';
import Card from '../../elements/Card/Card';
import { useDispatch } from 'react-redux';
import SingleImage from '../AddProduct/SingleImage';
export default function Media(props) {
  const dispatch = useDispatch();
  const { formulir, setFormulir } = props;
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
  };

  return (
    <>
      <Section>
        <SectionOne>
          <Card isNormal style={{ width: '100%' }}>
            <Form>
              <WrapsField>
                <Label>
                  <Span>Cover</Span>
                </Label>
                <div>
                  <SingleImage
                    id="cover"
                    onChange={(e) => handleChange(e, 'cover')}
                    isLoading={state.isLoading}
                  />
                </div>
                {typeof formulir.image.cover === 'object' ? null : (
                  <div style={{ width: '150px' }}>
                    <img
                      width="100%"
                      src={formulir.image.cover}
                      alt={formulir.image.cover}
                    />
                  </div>
                )}
              </WrapsField>
              <>{props.children}</>
            </Form>
          </Card>
        </SectionOne>
      </Section>
    </>
  );
}
