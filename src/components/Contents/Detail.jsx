import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Card from '@material-ui/core/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Section,
  SectionOne,
  Span,
  WrapsField,
  Label,
  Input,
} from '../../elements/Styled/StyledTabs';
import { fetchGetTopic, fetchGetProduct } from '../../store/actions';
import MultiSelect from '@khanacademy/react-multi-select';
// import Card from '../../elements/Card/Card';
export default function Detail(props) {
  const {
    onChange,
    name,
    isBlog,
    visibility,
    handleRadio,
    checkedFalse,
    checkedTrue,
    form,
    checked,
    setChecked,
    isTopic,
    isProduct,
    handleSelectProduct,
    handleSelectTopic,
  } = props;

  const dispatch = useDispatch();
  const topic = useSelector((state) => state.topic.getTopic);
  const product = useSelector((state) => state.product.getProduct);
  console.log(product, 'product di dalam blogg');
  useEffect(() => {
    dispatch(fetchGetTopic());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetProduct());
    // eslint-disable-next-line
  }, [dispatch]);
  const data = [{ key: 1, value: 'Loading', label: 'Loading...' }];
  const optionsTopic =
    topic === null
      ? data.map((item) => {
          return {
            item: item.key,
            value: item.value,
            label: item.label,
            isDisabled: true,
          };
        })
      : topic.data.map((item) => {
          return { key: item._id, value: item._id, label: item.name };
        });
  const optionsProduct =
    product === null
      ? data.map((item) => {
          return {
            item: item.key,
            value: item.value,
            label: item.label,
            isDisabled: true,
          };
        })
      : product.data.map((item) => {
          return { key: item._id, value: item._id, label: item.name };
        });

  return (
    <Card>
      <SectionOne>
        <div>
          <Form>
            {/* --- Field name product --- */}

            <WrapsField fullwidth>
              <div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Title Content..."
                />
              </div>
            </WrapsField>

            <WrapsField fullwidth>
              <div>
                <Input
                  as="select"
                  name="status"
                  id="status"
                  value={visibility}
                  onChange={onChange}
                >
                  <option value="" disabled hidden>
                    Status
                  </option>
                  <option value="publish">Public</option>
                  <option value="private">Private</option>
                  <option value="draft">Draft</option>
                </Input>
              </div>
            </WrapsField>
            {/* test */}

            <WrapsField fullwidth>
              <div>
                <Select
                  isMulti
                  name="colors"
                  value={isTopic}
                  options={optionsTopic}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSelectTopic}
                  placeholder="Select topic..."
                />
              </div>
            </WrapsField>
            <Label>
              <Span>Content Type</Span>
            </Label>
            <div style={{ display: 'flex' }}>
              <WrapsField>
                <Input
                  isRadioButton
                  type="radio"
                  name="content_type"
                  id="blog"
                  value="false"
                  checked={checkedFalse}
                  onChange={handleRadio}
                />{' '}
                <label htmlFor="blog">Fulfillment</label>
              </WrapsField>

              <WrapsField>
                <Input
                  isRadioButton
                  type="radio"
                  name="content-type"
                  id="fulfillment"
                  value="true"
                  checked={checkedTrue}
                  onChange={handleRadio}
                />{' '}
                <label htmlFor="fulfillment">Blog</label>
              </WrapsField>
              {/* blog */}

              {/* Radio Button 2 --- */}
            </div>

            {/* product dan module */}
            {form.isBlog === false ? (
              <>
                <WrapsField fullwidth>
                  <div>
                    <Select
                      isMulti
                      name="colors"
                      value={isProduct}
                      options={optionsProduct}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleSelectProduct}
                      placeholder="Select Product..."
                    />
                  </div>
                </WrapsField>
                <WrapsField fullwidth>
                  <label>
                    <input
                      type="checkbox"
                      name="module"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      // onChange={handleCheckbox}
                      // required
                    />
                    Click to active Module
                  </label>
                </WrapsField>
              </>
            ) : null}
          </Form>
        </div>
      </SectionOne>
    </Card>
  );
}
