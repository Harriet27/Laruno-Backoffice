import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPostContents } from '../../store/actions';
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
import { ButtonStyled } from '../../elements/Styled/StyledForm';
// --- a11yProps --- //
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
export default function AddContents() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // --- Form --- //
  const [form, setForm] = useState({
    name: '',
    isBlog: true,
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

  // --- Langsung Berhubungan Dengan Form --- //
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchPostContents(form, history));
  };
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleRadio = (event) => {
    if (event.target.value === 'true') {
      setForm({ ...form, isBlog: true });
    } else if (event.target.value === 'false') {
      setForm({ ...form, isBlog: false });
    }
  };
  const handleSelectTopic = (topic) => {
    setForm({ ...form, topic });
  };
  const handleSelectProduct = (product) => {
    setForm({ ...form, product });
  };

  // --- Perantara kepada Form --- //
  const [checked, setChecked] = useState(false);
  const [quill, setQuill] = useState('');
  const [formulir, setFormulir] = useState({
    image: {
      cover: '',
    },
    media: {},
  });
  const [sectionAdd, setSectionAdd] = useState([{ url: '' }]);
  const [sectionModule, setSectionModule] = useState([{ question: '' }]);
  const [sectionPodcast, setSectionPodcast] = useState([
    {
      url: '',
    },
  ]);

  // Menghubungkan Kepada Form
  form.cover_img = formulir.image.cover;
  form.content = quill;
  form.video = sectionAdd;
  form.module = sectionModule;
  form.podcast = sectionPodcast;

  function handleAddSection() {
    const values = [...sectionAdd];
    values.push({ url: '' });
    setSectionAdd(values);
  }
  function handleRemoveSection(i) {
    const values = [...sectionAdd];
    values.splice(i, 1);
    setSectionAdd(values);
  }
  function handleChangeDynamicSection(i, event) {
    const values = [...sectionAdd];
    values[i].url = event.target.value;
    setSectionAdd(values);
  }
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
          <Tab className="outline" label="Content" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div style={Styles.TabPanel}>
          <Detail
            isBlog={form.isBlog}
            onChange={handleChangeForm}
            name={form.name}
            visibility={form.visibility}
            handleRadio={handleRadio}
            checkedFalse={form.isBlog === false}
            checkedTrue={form.isBlog === true}
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
        <div style={Styles.TabPanel}>
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
        <div style={Styles.TabPanel}>
          <Contents checked={checked} value={quill} setValue={setQuill}>
            <DynamicFieldsModule
              fields={sectionModule}
              handleAdd={handleAddSectionModule}
              handleChange={handleChangeDynamicSectionModule}
              handleRemove={handleRemoveSectionModule}
            />
          </Contents>
          <div style={Styles.DisplayButton}>
            <ButtonStyled style={Styles.ButtonCancel}>
              <i className="fa fa-undo"></i> Cancel
            </ButtonStyled>
            <ButtonStyled
              // onClick={handleSubmit}
              onClick={handleSubmit}
              style={{ background: '#70CA63' }}
            >
              <i className="fa fa-save"></i> Save
            </ButtonStyled>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}

const Styles = {
  DisplayButton: {
    margin: '0 100px',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  ButtonCancel: { color: '#656565', background: '#F2F5F7' },
  TabPanel: {
    width: '100%',
    background: 'white',
  },
};
