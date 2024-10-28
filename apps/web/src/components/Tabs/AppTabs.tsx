import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@mantine/core';

import classes from './index.module.css';

const AppTabs = () => {
  const router = useRouter();
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabData = [
    { label: 'Marketplace', path: '/tabs/marketplace' },
    { label: 'Your Products', path: '/tabs/your-products' },
  ];

  const validRoutes = tabData.map((tab) => tab.path);
  const currentPath = router.pathname;

  const [value, setValue] = useState<string | null>(validRoutes.includes(currentPath) ? currentPath : null);

  const setControlRef = (val: string) => (node: HTMLButtonElement | null) => {
    if (node) controlsRefs.current[val] = node;
  };

  const handleTabChange = (tabValue: string | null) => {
    if (!tabValue || !validRoutes.includes(tabValue)) {
      setValue(null);
      return;
    }
    setValue(tabValue);
    router.push(tabValue, undefined, { shallow: true });
  };

  useEffect(() => {
    if (validRoutes.includes(currentPath)) {
      setValue(currentPath);
    } else {
      setValue(null);
    }
  }, [currentPath]);

  return (
    <Tabs variant="none" value={value} onChange={handleTabChange} w="100%">
      <Tabs.List className={classes.list}>
        {tabData.map((tab) => (
          <Tabs.Tab
            key={tab.path}
            value={tab.path}
            ref={setControlRef(tab.path)}
            className={`${classes.tab} ${value === tab.path ? classes.active : ''}`}
            fz="md"
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default AppTabs;
