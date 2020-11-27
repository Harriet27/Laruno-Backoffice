import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { LinkTab, a11yProps, TabPanel } from './Tabs';
import Marketing from './Marketing/Marketing';
import ElementAccordion from '../../elements/Accordion/Accordion';
import Pixel from './Marketing/Pixel';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Tools() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ margin: '50px' }}>
      <AppBar
        style={{
          background: 'none',
          // boxShadow: 'none',
          color: 'black',
        }}
        position="static"
      >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Marketing" href="/marketing" {...a11yProps(0)} />
          <LinkTab label="Sales & Followup" href="/sales" {...a11yProps(1)} />
          <LinkTab label="Resseler" href="/resseler" {...a11yProps(2)} />
          <LinkTab label="Automation" href="/automation" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '70%', marginRight: '10px' }}>
            <ElementAccordion title="PIXEL" components={<Pixel />} />
            <ElementAccordion title="ADS" components={<Marketing />} />
          </div>
          <div style={{ width: '30%', height: '500px' }}>Guide</div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Page Three
      </TabPanel>
    </div>
  );
}
