import { useState, useRef } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import classes from './index.module.css';

const AppTabs = () => {
  const router = useRouter();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('marketplace');
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setControlRef = (val: string) => (node: HTMLButtonElement | null) => {
    if (node) {
      controlsRefs.current[val] = node;
    }
  };

  const handleTabChange = (tabValue: string) => {
    router.push(tabValue, undefined, { shallow: true });
  };

  return (
    <Tabs variant="none" value={value} onChange={handleTabChange}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="/" ref={setControlRef('marketplace')} className={classes.tab}>
          Marketplace
        </Tabs.Tab>
        <Tabs.Tab value="your-products" ref={setControlRef('your-products')} className={classes.tab}>
          Your Products
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs.current[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>
    </Tabs>
  );
};

export default AppTabs;
