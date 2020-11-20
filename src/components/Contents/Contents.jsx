import React from 'react';
import {
  Form,
  Section,
  SectionOne,
  Span,
  WrapsField,
  Label,
  Input,
} from '../../elements/Styled/StyledTabs';
import Card from '../../elements/Card/Card';
import ReactQuillTest from '../AddProduct/ReactQuill';
export default function Contents(props) {
  const { checked } = props;
  return (
    <>
      <div>
        <SectionOne>
          <div>
            <Form>
              {checked === true ? (
                <>{props.children}</>
              ) : (
                <>
                  <Label>
                    <Span>Content</Span>
                  </Label>
                  <ReactQuillTest
                    value={props.value}
                    setValue={props.setValue}
                  />
                </>
              )}
              <div style={{ marginTop: '50px' }}>
                <WrapsField fullwidth>
                  <Label>
                    <Span>Tags</Span>
                  </Label>
                  <div>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      // value={name}
                      // onChange={onChange}
                      placeholder="Tags..."
                    />
                  </div>
                </WrapsField>
              </div>
            </Form>
          </div>
        </SectionOne>
      </div>
    </>
  );
}
