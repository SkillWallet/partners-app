import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './tabs.scss';
import { SwScrollbar } from 'sw-web-shared';
import { Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, sx, ...other } = props;
  return (
    <div
      role="tabpanel"
      className="sw-tabpanel"
      hidden={value !== index}
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: '10px 30px 30px 30px', ...(sx || {}) }}>{children}</Box>}
    </div>
  );
}

export default function SwTabs({ tabs, selectedTabIndex = 0, selectedTab = (e, v) => null, scrollbarStyles = {}, tabPanelStyles = {} }) {
  const [value, setValue] = React.useState(selectedTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    selectedTab(newValue, event);
  };

  return (
    <Box className="sw-tabs" sx={{ width: '100%' }}>
      <Box sx={{ mb: '24px' }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          sx={{
            '.MuiTabs-indicator': {
              display: 'none',
            },
            '.MuiButtonBase-root': {
              height: '65px',
              borderColor: 'primary.main',
              color: 'primary.main',
              textTransform: 'inherit',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'text.primary',
              },
            },
          }}
        >
          {tabs.map(({ label }) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <SwScrollbar
        sx={{
          height: 'calc(100% - 120px)',
          flex: 1,
          border: '2px solid',
          p: 3,
          ...scrollbarStyles,
        }}
      >
        {tabs.map(({ props, component, label, hideTop }, index) => {
          const Component = component;
          return (
            <TabPanel sx={tabPanelStyles} key={index} value={value} index={index}>
              {!hideTop && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <Typography sx={{ my: 2 }} component="div" variant="h2">
                    {label}
                  </Typography>
                  <Typography sx={{ my: 2 }} component="div" variant="h2">
                    Total - {props?.total || 0}
                  </Typography>
                </div>
              )}

              <Component {...props} />
            </TabPanel>
          );
        })}
      </SwScrollbar>
    </Box>
  );
}
