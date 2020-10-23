import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../elements/TabPanel/TabPanel';
import Detail from './Detail';
import Media from './Media';
import Contents from './Contents';

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
                <Detail />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Media />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Contents />
            </TabPanel>
        </div>
    );
}
