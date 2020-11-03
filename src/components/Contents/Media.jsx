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
import { fetchPostSingleImage } from '../../store/actions';
import Card from '../../elements/Card/Card';
import { useDispatch } from 'react-redux';
import SingleImage from '../AddProduct/SingleImage';
export default function Media(props) {
    const dispatch = useDispatch();
    const { formulir, setFormulir } = props;
    const handleChange = (e) => {
        let image = formulir.image;
        let field = e.target.id;
        image[field] = e.target.files[0];
        setFormulir({ image });
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        // --- upload image --- //
        dispatch(fetchPostSingleImage(formulir, e, id, setFormulir));
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
                                        onChange={handleChange}
                                        onSubmit={(e) =>
                                            handleSubmit(e, 'cover')
                                        }
                                    />
                                </div>
                                {typeof formulir.image.cover ===
                                'object' ? null : (
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
