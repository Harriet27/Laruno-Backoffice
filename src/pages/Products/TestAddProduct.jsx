import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ButtonStyled, ResponsiveTabs } from '../../elements/Styled/StyledForm';
import Card from '@material-ui/core/Card';
// --- React Hook Form --- //
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddProductSchema } from '../../elements/Validation/AddProductSchema';

// --- Fetch/Store/Actions/ elements --- //
import { fetchPostProducts } from '../../store/actions';
import DetailProduct from '../../components/AddProduct/DetailProduct';
import TabPanel from '../../elements/TabPanel/TabPanel';
import Layout from '../../components/AddProduct/Layout';
import DynamicField from '../../components/AddProduct/DynamicField';
import DynamicFieldSection from '../../components/AddProduct/DynamicFieldSection';
import Bump from '../../components/AddProduct/Bump';
import { Spinner } from 'reactstrap';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TestAddProduct() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // --- React Hook Form --- //
  // const { register, handleSubmit, errors } = useForm({
  //     resolver: yupResolver(AddProductSchema),
  // });

  // --- Form All --- //
  const [form, setForm] = useState({
    // --- section one --- //
    name: '',
    code: '',
    slug: '',
    type: '',
    boe: '',
    ecommerce: '',
    topic: [],
    price: '',
    time_period: '',
    visibility: '',
    sale_method: '',
    bump: '',

    // --- Section 2 --- //
    headline: '',
    subheadline: '',
    description: '',
    learn_about: '',
    sale_price: '',
    image_url: [],
    // video_url: '',
    agent: [],
    image_bonus_url: '',
    // image_text_url: [],
    // image_product_url: [],
    // --- media url --- //
    media_url: '',
    section: '',
    feature: '',
  });
  // console.log('FORM ADD PRODUCT', form);
  const [state, setState] = useState({
    isLoading: false,
  });
  // --- Detail Product --- //
  // --- Test Order Bump,  Webinar, ecommerce--- //
  const [objBump, setObjBump] = useState({
    bump_name: '',
    bump_price: '',
    bump_image: '',
    bump_weight: '',
    bump_heading: '',
    bump_desc: '',
  });

  const [objBoe, setobjBoe] = useState({
    date: '',
    duration: '',
    start_time: '',
    client_url: '',
  });

  const [objEcommerce, setObjEcommerce] = useState({
    weight: 0,
    shipping_charges: true,
    stock: 0,
  });

  const [objFeature, setObjFeature] = useState({
    feature_onheader: '',
    feature_onpage: '',
  });

  const handleBump = (event) => {
    setObjBump({ ...objBump, [event.target.name]: event.target.value });
  };
  const handleBoe = (event) => {
    setobjBoe({
      ...objBoe,
      [event.target.name]: event.target.value,
    });
  };

  const handleEcommerce = (event) => {
    setObjEcommerce({
      ...objEcommerce,
      [event.target.name]: event.target.value,
    });
  };
  const handleFeature = (event) => {
    setObjFeature({
      ...objFeature,
      [event.target.name]: event.target.value,
    });
  };

  const bayar_ongkir = 'true';
  const gratis_ongkir = 'false';
  // handle radio button
  const handleRadio = (event) => {
    if (event.target.value === 'true') {
      setObjEcommerce({ ...objEcommerce, shipping_charges: true });
    } else if (event.target.value === 'false') {
      setObjEcommerce({ ...objEcommerce, shipping_charges: false });
    }
  };
  // console.log(form.bump, 'form_bump');
  form.bump = [{ ...objBump }];
  // form.webinar = { ...objBoe };
  form.boe = { ...objBoe };
  form.ecommerce = { ...objEcommerce };
  form.feature = { ...objFeature };

  const handleSubmit = (event) => {
    setState({
      isLoading: true,
    });
    // history
    dispatch(fetchPostProducts({ form, history, setState }));
  };

  // handle change untuk onChange
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // --- try handle select multiple --- //
  // const handleSelect = (topic) => {
  //   setForm({ ...form, topic });
  // };

  // const handleSelectAgent = (agent) => {
  //   setForm({ ...form, agent });
  // };
  const [selecting, setSelecting] = useState({
    agent: '',
    topic: '',
  });
  // console.log(selecting, 'selecting');
  const handleSelectAgent = (agent) => {
    const isAgent =
      agent !== null &&
      agent.map((item) => {
        return item.key;
      });

    setSelecting({
      ...selecting,
      agent,
    });
    form.agent = isAgent || '';
  };
  const handleSelectTopic = (topic) => {
    const isTopic =
      topic !== null &&
      topic.map((item) => {
        return item.key;
      });

    setSelecting({
      ...selecting,
      topic,
    });
    form.topic = isTopic || '';
  };

  // ======>>> lOGIC DETAIL PRODUCT SECTION 2 "layout" <<<====== //

  // ------> Logic untuk Dynamic Form Learn About <------ //
  const [fields, setFields] = useState([{ title: '', content: '', note: '' }]);
  // ===>> Handle Change <<===  //
  function handleChangeDynamic(i, event) {
    const values = [...fields];
    values[i].title = event.target.value;
    setFields(values);
  }
  function handleChangeContents(i, event) {
    // semua object di dalam fields
    const values = [...fields];
    // untuk semua object yang berisi key 'content' di dalam fields yg kita klik maka valuenya merupakan hasil inputan kita
    values[i].content = event.target.value;

    setFields(values);
  }
  function handleChangeNote(i, event) {
    const values = [...fields];
    values[i].note = event.target.value;
    setFields(values);
  }
  function handleAdd() {
    //  menambahkan field ke dalam value input terbaru
    const values = [...fields];
    values.push({ title: '', content: '', note: '' });
    setFields(values);
  }

  // --- Optional "just test" ---- //
  function handleRemove(i) {
    const values = [...fields];
    // splice (i = indeks, (2) berarti delete 2 value di mulai dari indeks ke i)
    values.splice(i, 1);
    setFields(values);
  }
  form.learn_about = [...fields];
  // ---- BATAS BAWAH !!!! ---- //

  // ------> Logic untuk Dynamic Form Section <------ //
  const [sectionAdd, setSectionAdd] = useState([
    { title: '', content: '', image: '' },
  ]);
  console.log(sectionAdd, 'section add isinya apa');
  const [formulir, setFormulir] = useState({
    image: {
      image_url: '',
      bump_image: '',
      media_url: '',
      image_bonus: '',
    },
  });

  // ===>> Handle Change <<===  //
  function handleChangeDynamicSection(i, event) {
    const values = [...sectionAdd];
    values[i].title = event.target.value;
    setSectionAdd(values);
  }
  function handleChangeContentsSection(i, event) {
    // semua object di dalam fields
    const values = [...sectionAdd];
    // untuk semua object yang berisi key 'content' di dalam fields yg kita klik maka valuenya merupakan hasil inputan kita
    values[i].content = event.target.value;
    // values[i].image = formulir.image[`image_section_${i}`];

    setSectionAdd(values);
  }

  function handleAddSection() {
    //  menambahkan field ke dalam value input terbaru
    const values = [...sectionAdd];
    values.push({ title: '', content: '', image: '' });

    setSectionAdd(values);
  }

  // --- Optional "just test" ---- //
  function handleRemoveSection(i) {
    const values = [...sectionAdd];
    // splice (i = indeks, (2) berarti delete 2 value di mulai dari indeks ke i)
    values.splice(i, 1);
    setSectionAdd(values);
  }
  form.section = [...sectionAdd];
  // ---- BATAS BAWAH !!!! ---- //

  // --- DURATION --- ///
  const [duration, setDuration] = useState({
    hours: '',
    minutes: '',
  });

  const handleDuration = (e) => {
    setDuration({ ...duration, [e.target.name]: e.target.value });
  };
  objBoe.duration = duration.hours + ':' + duration.minutes;

  // --- react quill --- //
  const [quill, setQuill] = useState('');

  form.description = quill;

  // --- Upload Image --- //

  form.image_url = formulir.image.image_url;
  objBump.bump_image = formulir.image.bump_image;

  const [arr, setArr] = useState({
    image_url: [],
  });

  // const [arrImageProduct, setArrImageProduct] = useState([]);

  form.image_url = arr.image_url;
  form.image_bonus_url = formulir.image.image_bonus;
  // form.image_text_url = arr.image_text;
  form.media_url = formulir.image.media_url;
  return (
    <ResponsiveTabs>
      <AppBar position="static" style={{ background: 'white' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className="outline" label="Detail Product" {...a11yProps(0)} />
          <Tab className="outline" label="Layout" {...a11yProps(1)} />
          <Tab className="outline" label="Bump" {...a11yProps(2)} />
          <Tab className="outline" label="Section" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div
          style={{
            width: '100%',
            background: 'white',
          }}
        >
          <DetailProduct
            handleRadio={handleRadio}
            handleSelect={handleSelectTopic}
            onChange={handleChangeForm}
            form={form.type}
            name={form.name}
            type={form.type}
            topic_select={form.topic}
            price={form.price}
            time_period={form.time_period}
            visibility={form.visibility}
            sale_method={form.sale_method}
            slug={form.slug}
            sale_price={form.sale_price}
            code={form.code}
            // image
            formulir={formulir}
            setFormulir={setFormulir}
            setArr={setArr}
            arr={arr}
            // --- Ecommerce --- //
            stock={objEcommerce.stock}
            handleEcommerce={handleEcommerce}
            weight={objEcommerce.weight}
            checked_bayar={objEcommerce.shipping_charges === true}
            checked_gratis={objEcommerce.shipping_charges === false}
            bayar_ongkir={bayar_ongkir}
            gratis_ongkir={gratis_ongkir}
            // --- Webinar --- //
            zoom_id={objBoe.client_url}
            date={objBoe.date}
            start_time={objBoe.start_time}
            duration_hours={duration.hours}
            duration_minute={duration.minutes}
            handleBoe={handleBoe}
            handleDuration={handleDuration}
            isTopic={selecting.topic}
            // --- REACT HOOK FORM --- //
            // register={register}
            // errors={errors}
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
          <Layout
            handleSelect={handleSelectAgent}
            onChange={handleChangeForm}
            handleFeature={handleFeature}
            isAgent={selecting.agent}
            headline={form.headline}
            image_bonus_url={form.image_bonus_url}
            // image_text_url={form.image_text_url}
            // image_product_url={form.image_product_url}
            // video={form.video_url}
            feature_onpage={objFeature.feature_onpage}
            feature_onheader={objFeature.feature_onheader}
            agent={form.agent}
            subheadline={form.subheadline}
            // --- React Quill --- //
            value={quill}
            setValue={setQuill}
            // --- multiple image --- //
            setArr={setArr}
            arr={arr}
            formulir={formulir}
            setFormulir={setFormulir}
            // --- REACT HOOK FORM --- //
            // register={register}
            // errors={errors}
          >
            {form.type === 'ecommerce' ? null : (
              <DynamicField
                fields={fields}
                handleAdd={handleAdd}
                handleChange={handleChangeDynamic}
                handleChangeContents={handleChangeContents}
                handleRemove={handleRemove}
                handleChangeNote={handleChangeNote}
              />
            )}
          </Layout>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div
          style={{
            width: '100%',
            background: 'white',
          }}
        >
          <Bump
            onChange={handleBump}
            bump_name={objBump.bump_name}
            bump_price={objBump.bump_price}
            bump_weight={objBump.bump_weight}
            bump_image={objBump.bump_image}
            bump_heading={objBump.bump_heading}
            bump_desc={objBump.bump_desc}
            formulir={formulir}
            setFormulir={setFormulir}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div
          style={{
            width: '100%',
            background: 'white',
          }}
        >
          <Card>
            <DynamicFieldSection
              fields={sectionAdd}
              handleAdd={handleAddSection}
              handleChange={handleChangeDynamicSection}
              handleChangeContents={handleChangeContentsSection}
              handleRemove={handleRemoveSection}
              formulir={formulir}
              setFormulir={setFormulir}
              sectionAdd={sectionAdd}
              setSectionAdd={setSectionAdd}
            />

            <div
              style={{
                margin: '30px 40px',
                paddingBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ButtonStyled style={{ color: '#656565', background: '#F2F5F7' }}>
                <i className="fa fa-undo"></i> Cancel
              </ButtonStyled>
              <ButtonStyled
                // onClick={handleSubmit}
                onClick={handleSubmit}
                style={{ background: '#70CA63' }}
              >
                <div style={{ width: '100px', textAlign: 'center' }}>
                  {state.isLoading ? (
                    <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />
                  ) : (
                    <>
                      {' '}
                      <i
                        style={{ marginRight: '5px' }}
                        className="fa fa-save"
                      ></i>
                      Save
                    </>
                  )}
                </div>
              </ButtonStyled>
            </div>
          </Card>
        </div>
      </TabPanel>
    </ResponsiveTabs>
  );
}
