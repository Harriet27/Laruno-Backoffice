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
import moment from 'moment';
// --- Fetch/Store/Actions/ elements --- //
import { fetchPostProducts, fetchUpdateProduct } from '../../store/actions';
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

export default function UpdateProduct(props) {
  const {
    id,
    name,
    price,
    sale_price,
    slug,
    subheadline,
    time_period,
    type,
    visibility,
    media_url,
    code,
    sale_method,
    description,
    headline,
    feature_onpage,
    feature_onheader,
    image_bonus,
    image_url,
    boe,
    bump,
    ecommerce,
    topic,
    agent,
    learn_about,
    section,
  } = props;
  console.log({ boe, bump, ecommerce, topic }, 'boe,bump ,data');
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // --- Form All --- //
  const [form, setForm] = useState({
    // --- section one --- //
    name: name || '',
    code: code || '',
    slug: slug || '',
    type: type || '',
    boe: '',
    ecommerce: '',
    topic: [],
    price: price || '',
    time_period: time_period || '',
    visibility: visibility || '',
    sale_method: sale_method || '',
    bump: '',

    // --- Section 2 --- //
    headline: headline || '',
    subheadline: subheadline || '',
    description: '',
    learn_about: '',
    sale_price: sale_price || '',
    image_url: [],
    agent: [],
    image_bonus_url: '',
    // --- media url --- //
    media_url: '',
    section: '',
    feature: '',
  });
  console.log('FORM ADD PRODUCT', form);
  const [state, setState] = useState({
    isLoading: false,
  });
  // --- Detail Product --- //
  // --- Test Order Bump,  Boe, ecommerce--- //
  const [objBump, setObjBump] = useState({
    bump_name: bump.bump_name || '',
    bump_price: bump.bump_price || '',
    bump_image: '',
    bump_weight: bump.bump_weight || '',
    bump_heading: bump.bump_heading || '',
    bump_desc: bump.bump_desc || '',
  });

  const [objBoe, setobjBoe] = useState({
    date:
      moment(boe === null ? null : boe.date).format('YYYY-MM-DD') || '',
    duration: '',
    start_time: boe === null ? null : boe.start_time || '',
    client_url: boe === null ? null : boe.client_url || '',
  });

  const [objEcommerce, setObjEcommerce] = useState({
    weight: ecommerce === null ? null : ecommerce.weight || 0,
    shipping_charges:
      ecommerce === null ? null : ecommerce.shipping_charges || true,
    stock: ecommerce === null ? null : ecommerce.stock || 0,
  });

  const [objFeature, setObjFeature] = useState({
    feature_onheader: feature_onheader || '',
    feature_onpage: feature_onpage || '',
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
  console.log('update product', objBoe);

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

  form.bump = [{ ...objBump }];
  form.boe = { ...objBoe };
  form.ecommerce = { ...objEcommerce };
  form.feature = { ...objFeature };

  const handleSubmit = (event) => {
    setState({
      isLoading: true,
    });
    // history
    dispatch(fetchUpdateProduct({ form, id, history, setState }));
  };

  // handle change untuk onChange
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const FilterReactSelect = (value) => {
    return (
      value !== null &&
      value.map((item) => {
        return { key: item._id, value: item._id, label: item.name };
      })
    );
  };

  const [selecting, setSelecting] = useState({
    agent: FilterReactSelect(agent) || [],
    topic: FilterReactSelect(topic) || [],
  });

  const handleSelectAgent = (agent) => {
    setSelecting({
      ...selecting,
      agent,
    });
  };
  const handleSelectTopic = (topic) => {
    setSelecting({
      ...selecting,
      topic,
    });
  };
  const AddKeyValueToArray = (value) => {
    return value === undefined
      ? null
      : value.map((item) => {
          return item.key;
        });
  };
  form.agent = AddKeyValueToArray(selecting.agent) || [];
  form.topic = AddKeyValueToArray(selecting.topic) || [];

  const [fields, setFields] = useState(
    learn_about || [{ title: '', content: '', note: '' }]
  );

  function handleChangeDynamic(i, event) {
    const values = [...fields];
    values[i].title = event.target.value;
    setFields(values);
  }
  function handleChangeContents(i, event) {
    const values = [...fields];
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

  const [sectionAdd, setSectionAdd] = useState(
    section || [{ title: '', content: '', image: '' }]
  );
  const [formulir, setFormulir] = useState({
    image: {
      image_url: '',
      bump_image: bump.bump_image || '',
      media_url: media_url || '',
      image_bonus: image_bonus || '',
    },
  });
  function handleChangeDynamicSection(i, event) {
    const values = [...sectionAdd];
    values[i].title = event.target.value;
    setSectionAdd(values);
  }
  function handleChangeContentsSection(i, event) {
    const values = [...sectionAdd];
    values[i].content = event.target.value;
    setSectionAdd(values);
  }
  function handleAddSection() {
    const values = [...sectionAdd];
    values.push({ title: '', content: '', image: '' });
    setSectionAdd(values);
  }
  function handleRemoveSection(i) {
    const values = [...sectionAdd];
    values.splice(i, 1);
    setSectionAdd(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  let durationUpdate = boe === null ? null : boe.duration.split(':');
  const [duration, setDuration] = useState({
    hours: durationUpdate === null ? null : durationUpdate[0] || '',
    minutes: durationUpdate === null ? null : durationUpdate[1] || '',
  });
  const handleDuration = (e) => {
    setDuration({ ...duration, [e.target.name]: e.target.value });
  };
  const [quill, setQuill] = useState(description);
  const [arr, setArr] = useState({
    image_url: image_url || [],
  });

  // const [arrImageProduct, setArrImageProduct] = useState([]);
  form.learn_about = [...fields];
  form.section = [...sectionAdd];
  objBoe.duration = duration.hours + ':' + duration.minutes;
  form.description = quill;
  form.image_url = formulir.image.image_url;
  objBump.bump_image = formulir.image.bump_image;
  form.image_url = arr.image_url;
  form.image_bonus_url = formulir.image.image_bonus;
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
            // --- Boe --- //
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
