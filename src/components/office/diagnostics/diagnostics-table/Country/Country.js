import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import CountryRuTable from './Country-ru';
import CountryEnTable from './Country-en';


let Country = () => {
    return (
        <div className="tabs_diagnostics">
            <Tabs>
                <TabList>
                    <Tab>Ru</Tab>
                    <Tab>En</Tab>
                </TabList>

                <TabPanel>
                    <CountryRuTable />
                </TabPanel>
                <TabPanel>
                    <CountryEnTable />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Country;