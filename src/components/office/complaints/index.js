import React, { useState, useMemo, useRef, useCallback } from 'react'
import { getUserName } from '../../../utils/helpers'
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ComplaintsRu from "./complaints-ru";
import ComplaintsEn from "./complaints-en";

// const { REACT_APP_SERVER } = process.env

const Complaints = () => {
	return (
		<div>
			<Tabs>
				<TabList>
					<Tab>Ru</Tab>
					<Tab>En</Tab>
				</TabList>

				<TabPanel>
					<ComplaintsRu />
				</TabPanel>
				<TabPanel>
					<ComplaintsEn />
				</TabPanel>
			</Tabs>
		</div>
	)
};
export default Complaints
