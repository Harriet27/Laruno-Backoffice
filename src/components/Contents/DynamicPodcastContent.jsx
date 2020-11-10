import Card from '../../elements/Card/Card';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostDynamicPodcast } from '../../store/actions';
import Styled from 'styled-components';
import SingleImage from '../AddProduct/SingleImage';
import { Span, Input } from '../../elements/Styled/StyledTabs';

const ButtonModal = Styled.button`
    background-color: ${(props) => (props.delete ? 'red' : '#0098DA')};
    color: white;
    width: 100%;
    padding: 5px;
    font-size: 18px;
    font-weight: 400;
    border-radius: 3px;
    border: 1px solid #ced4da;
    &:focus{
        outline: none !important;
        border:1px solid #66AFE9;
    }
`;

const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;

export default function DynamicPodcastContents(props) {
    const dispatch = useDispatch();
    const {
        handleAdd,
        handleChange,
        handleChangeContents,
        fields,
        handleRemove,
        formulir,
        setFormulir,
        sectionAdd,
        setSectionAdd,
    } = props;

    const handleChangePodcast = (e, idx) => {
        let image = formulir.image;
        let field = e.target.id;
        image[field] = e.target.files[0];
        setFormulir({ image });
    };

    const handleSubmit = async (e, id, index) => {
        e.preventDefault();

        //  upload image
        dispatch(
            fetchPostDynamicPodcast(
                formulir,
                e,
                id,
                setFormulir,
                sectionAdd,
                setSectionAdd,
                index
            )
        );
    };

    return (
        <>
            <div
                style={{ display: 'flex', flexDirection: 'column' }}
                className="App"
            >
                <div>
                    <label>
                        <Span>Podcast</Span>
                    </label>
                </div>
                {/* --- Testing --- */}
                <div name="test">
                    {fields.map((field, idx) => {
                        return (
                            <WrapsField key={`${field}-${idx}`}>
                                <div style={{ display: 'flex' }}>
                                    <Input
                                        width="35%"
                                        type="text"
                                        name={`one-${idx}`}
                                        placeholder="Podcast Url..."
                                        value={field.url}
                                        onChange={(e) => handleChange(idx, e)}
                                    />

                                    <SingleImage
                                        style={{ width: '35%' }}
                                        id={`podcast_section_${idx}`}
                                        onChange={(e) =>
                                            handleChangePodcast(e, idx)
                                        }
                                        onSubmit={(e) =>
                                            handleSubmit(
                                                e,
                                                `podcast_section_${idx}`,
                                                idx
                                            )
                                        }
                                    />

                                    <ButtonModal
                                        style={{ width: '10%' }}
                                        delete
                                        type="button"
                                        onClick={() => handleRemove(idx)}
                                    >
                                        x
                                    </ButtonModal>
                                </div>
                            </WrapsField>
                        );
                    })}
                </div>
                <ButtonModal type="button" onClick={() => handleAdd()}>
                    Add Podcast section
                </ButtonModal>
            </div>
        </>
    );
}
