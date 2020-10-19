import React, { useEffect } from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import Card from '../../elements/Card/Card';
import { fetchGetAgents } from '../../store/actions';
import ReactQuillTest from './ReactQuill';
// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Section = Styled.section`
    display: flex;
    padding: 50px 100px;
    width: 100%;
    line-height: 1.5;
    @media (max-width: 800px) {
        padding: 20px 40px;
          }
`;
const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.normal ? '100%' : '30%')}
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const SectionOne = Styled.div`
// display: flex;
width: 100%;
@media (max-width: 800px) {
    width: 100%
      }
`;

// --- Styled Components --- //

export default function Layout(props) {
    const dispatch = useDispatch();
    const {
        headline,
        onChange,
        // description,
        subheadline,
        video,
        image_bonus_url,
        image_product_url,
        image_text_url,
        feature_onheader,
        feature_onpage,
        agent,
        handleSelectAgent,
        handleFeature,
        children,
    } = props;

    // --- Agents --- //
    const agents = useSelector((state) => state.agents.getAgents);
    console.log(agents, 'ini agents');
    useEffect(() => {
        dispatch(fetchGetAgents());
    }, [dispatch]);

    let optionsAgents =
        agents !== null &&
        agents.data.map((item) => {
            return { key: item._id, value: item._id, label: item.name };
        });

    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <div style={{ padding: '30px 40px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
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
                                            allItemsAreSelected:
                                                'Semua role dipilih',
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
                        <WrapsField normal style={{ marginBottom: '100px' }}>
                            <Label>
                                <Span>Description</Span>
                            </Label>

                            <ReactQuillTest
                                value={props.value}
                                setValue={props.setValue}
                            />
                        </WrapsField>

                        {/* Children untuk learn about  */}
                        <React.Fragment>{children}</React.Fragment>

                        {/* feature onpage */}
                        <WrapsField normal>
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
                                />
                            </div>
                        </WrapsField>

                        {/* Feature On Header */}

                        <WrapsField normal>
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
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image Bonus</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_bonus_url"
                                    id="image_bonus_url"
                                    value={image_bonus_url}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image text</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_text_url"
                                    id="image_text_url"
                                    value={image_text_url}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image Product</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_product_url"
                                    id="image_product_url"
                                    value={image_product_url}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Video</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="video_url"
                                    id="video_url"
                                    value={video}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>
                    </div>
                </Card>
            </SectionOne>
        </Section>
    );
}
