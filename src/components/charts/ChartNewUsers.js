/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
// import { getUsersData } from './contracts/api';
import { VictoryAxis, VictoryLine } from 'victory';

const ChartNewUsers = () => {
  // const [userData, setUserData] = useState({});

  // Live Testnet data
  // useEffect(async () => {
  //     const d = await getUsersData();
  //     setUserData(d);
  // }, []);

  const styles = getStyles();
  const dataSetOne = getDataSetOne();
  const dataSetTwo = getDataSetTwo();
  const tickValues = getTickValues();

  function getDataSetOne() {
    return [
      { x: 'Jan', y: 5000 },
      { x: 'Feb', y: 4800 },
      { x: 'Mar', y: 4850 },
      { x: 'Apr', y: 4900 },
      { x: 'May', y: 4500 },
      { x: 'Jun', y: 3800 },
      { x: 'Jul', y: 2400 },
      { x: 'Aug', y: 2700 },
      { x: 'Sep', y: 3200 },
      { x: 'Oct', y: 3100 },
      { x: 'Nov', y: 3100 },
      { x: 'Dec', y: 1900 },
    ];
  }

  function getDataSetTwo() {
    return [
      { x: 'Jan', y: 0 },
      { x: 'Feb', y: 400 },
      { x: 'Mar', y: 420 },
      { x: 'Apr', y: 380 },
      { x: 'May', y: 420 },
      { x: 'Jun', y: 390 },
      { x: 'Jul', y: 550 },
      { x: 'Aug', y: 780 },
      { x: 'Sep', y: 1200 },
      { x: 'Oct', y: 1200 },
      { x: 'Nov', y: 1250 },
      { x: 'Dec', y: 1250 },
    ];
  }

  function getTickValues() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  function getStyles() {
    const BLUE_COLOR = '#00a3de';
    const RED_COLOR = '#7c270b';

    return {
      parent: {
        background: '#ccdee8',
        boxSizing: 'border-box',
        display: 'inline',
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#000000',
        fontFamily: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold',
      },
      labelNumber: {
        textAnchor: 'middle',
        fill: '#ffffff',
        fontFamily: 'inherit',
        fontSize: '14px',
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: 'black', strokeWidth: 1 },
        ticks: {
          size: ({ tick }) => {
            return 10;
          },
          stroke: 'black',
          strokeWidth: 1,
        },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 16,
        },
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : 'grey'),
          strokeWidth: 2,
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: 'inherit',
          fontSize: 12,
        },
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic',
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 1.5 },
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontWeight: 300,
        fontSize: 21,
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: 'inherit',
          fontSize: 16,
        },
      },
      labelTwo: {
        textAnchor: 'end',
        fill: RED_COLOR,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic',
      },
      lineTwo: {
        data: { stroke: RED_COLOR, strokeWidth: 4.5 },
      },
    };
  }

  return (
    // https://formidable.com/open-source/victory/guides/custom-charts/
    <svg
      // style={styles.parent}
      viewBox="0 0 450 290"
    >
      {/* <VictoryLabel x={425} y={55} style={styles.labelTwo}
            text={"Dinosaur exports\n $bn"}
            /> */}

      <g transform="translate(0, 0)">
        {/* Add shared independent axis */}
        <VictoryAxis
          scale="time"
          standalone={false}
          style={styles.axisYears}
          tickValues={tickValues}
          tickFormat={(x) => {
            return tickValues[x - 1];
          }}
        />

        {/*
                Add the dependent axis for the first data set.
                Note that all components plotted against this axis will have the same y domain
                */}
        <VictoryAxis dependentAxis domain={[-10, 5000]} offsetX={50} orientation="left" standalone={false} style={styles.axisOne} />

        {/* dataset one */}
        <VictoryLine
          data={dataSetOne}
          interpolation="monotoneX"
          scale={{ x: 'time', y: 'linear' }}
          standalone={false}
          style={styles.lineOne}
        />

        {/* dataset two */}
        <VictoryLine data={dataSetTwo} interpolation="monotoneX" scale={{ x: 'time', y: 'linear' }} standalone={false} />
      </g>
    </svg>
  );
};

export default ChartNewUsers;
