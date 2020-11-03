import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../elements/TabPanel/TabPanel';
import Detail from './Detail';
import Media from './Media';
import Contents from './Contents';
import DynamicFieldsContent from './DynamicFieldsContents';
import DynamicPodcastContent from './DynamicPodcastContent';
import DynamicFieldsModule from './DynamicFieldsModule';

// --- a11yProps --- //
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function AddContents() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // --- Form --- //
    const [form, setForm] = useState({
        name: '',
        isFullfillment: true,
        cover_img: '',
        // short_content: '',
        product: [],
        topic: [],
        content: '',
        images: [],
        module: [
            {
                question: '',
            },
        ],
        video: [
            {
                url: '',
            },
        ],
        podcast: [
            {
                url: '',
            },
        ],
        tag: [],
    });

    console.log(form, 'form di dalam content berisi apa');
    const handleChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleRadio = (event) => {
        if (event.target.value === 'true') {
            setForm({ ...form, isFulfillment: true });
        } else if (event.target.value === 'false') {
            setForm({ ...form, isFulfillment: false });
        }
    };
    const handleSelectTopic = (topic) => {
        setForm({ ...form, topic });
    };
    const handleSelectProduct = (product) => {
        setForm({ ...form, product });
    };

    const [checked, setChecked] = useState(false);
    console.log(checked);
    // quill
    const [quill, setQuill] = useState('');
    form.content = quill;
    const [formulir, setFormulir] = useState({
        image: {
            cover: '',
        },
        media: {},
    });
    form.cover_img = formulir.image.cover;

    // --- Video --- //
    const [sectionAdd, setSectionAdd] = useState([{ url: '' }]);
    console.log(sectionAdd, 'video');
    form.video = sectionAdd;
    function handleAddSection() {
        //  menambahkan field ke dalam value input terbaru
        const values = [...sectionAdd];
        values.push({ url: '' });

        setSectionAdd(values);
    }

    // --- Optional "just test" ---- //
    function handleRemoveSection(i) {
        const values = [...sectionAdd];
        // splice (i = indeks, (2) berarti delete 2 value di mulai dari indeks ke i)
        values.splice(i, 1);
        setSectionAdd(values);
    }
    function handleChangeDynamicSection(i, event) {
        const values = [...sectionAdd];
        values[i].url = event.target.value;
        setSectionAdd(values);
    }

    // --- module --- //
    const [sectionModule, setSectionModule] = useState([{ question: '' }]);
    form.module = sectionModule;
    const handleAddSectionModule = () => {
        const values = [...sectionModule];
        values.push({ question: '' });

        setSectionModule(values);
    };
    function handleChangeDynamicSectionModule(i, event) {
        const values = [...sectionModule];
        values[i].question = event.target.value;
        setSectionModule(values);
    }
    function handleRemoveSectionModule(i) {
        const values = [...sectionModule];
        values.splice(i, 1);
        setSectionModule(values);
    }

    // --- Podcast --- //
    const [sectionPodcast, setSectionPodcast] = useState([
        {
            url: '',
        },
    ]);
    form.podcast = sectionPodcast;
    const handleAddSectionPodcast = () => {
        const values = [...sectionPodcast];
        values.push({ url: '' });

        setSectionPodcast(values);
    };
    function handleChangeDynamicSectionPodcast(i, event) {
        const values = [...sectionPodcast];
        values[i].url = event.target.value;
        setSectionPodcast(values);
    }
    function handleRemoveSectionPodcast(i) {
        const values = [...sectionPodcast];
        values.splice(i, 1);
        setSectionPodcast(values);
    }

    return (
        <div style={{ margin: '50px' }}>
            <AppBar position="static" style={{ background: 'white' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className="outline" label="Detail" {...a11yProps(0)} />
                    <Tab className="outline" label="Media" {...a11yProps(1)} />
                    <Tab
                        className="outline"
                        label="Content"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <div
                    style={{
                        width: '100%',
                        background: 'white',
                    }}
                >
                    <Detail
                        isFulfillment={form.isFullfillment}
                        onChange={handleChangeForm}
                        name={form.name}
                        visibility={form.visibility}
                        handleRadio={handleRadio}
                        checkedFalse={form.isFulfillment === false}
                        checkedTrue={form.isFulfillment === true}
                        form={form}
                        checked={checked}
                        setChecked={setChecked}
                        topic_select={form.topic}
                        handleSelectTopic={handleSelectTopic}
                        handleSelectProduct={handleSelectProduct}
                        product_select={form.product}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div
                    style={{
                        width: '100%',
                        background: 'white',
                    }}
                >
                    <Media formulir={formulir} setFormulir={setFormulir}>
                        <DynamicFieldsContent
                            handleAdd={handleAddSection}
                            handleChange={handleChangeDynamicSection}
                            handleRemove={handleRemoveSection}
                            formulir={formulir}
                            setFormulir={setFormulir}
                            sectionAdd={sectionAdd}
                            setSectionAdd={setSectionAdd}
                        />
                        <DynamicPodcastContent
                            fields={sectionPodcast}
                            handleAdd={handleAddSectionPodcast}
                            handleChange={handleChangeDynamicSectionPodcast}
                            // handleChangeContents={handleChangeContentsSection}
                            handleRemove={handleRemoveSectionPodcast}
                            formulir={formulir}
                            setFormulir={setFormulir}
                            sectionAdd={sectionPodcast}
                            setSectionAdd={setSectionPodcast}
                        />
                    </Media>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div
                    style={{
                        width: '100%',
                        background: 'white',
                    }}
                >
                    <Contents
                        checked={checked}
                        value={quill}
                        setValue={setQuill}
                    >
                        <DynamicFieldsModule
                            fields={sectionModule}
                            handleAdd={handleAddSectionModule}
                            handleChange={handleChangeDynamicSectionModule}
                            handleRemove={handleRemoveSectionModule}
                        />
                    </Contents>
                </div>
            </TabPanel>
        </div>
    );
}
