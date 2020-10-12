import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useState } from 'react';

export default function ReactQuillTest(props) {
    // --- in Props --- //
    const { value, setValue } = props;
    // const [value, setValue] = useState('');
    // console.log(value);
    // const handleChange = (event) => {
    //     setValue({ ...value });
    // };
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            [{ color: [] }, { background: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'font',
        'size',
        'color',
        'background',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    return (
        <ReactQuill
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
        />
    );
}
