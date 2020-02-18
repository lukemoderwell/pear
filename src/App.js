import React, { useEffect, useState, Fragment } from 'react';
import Content from './Content';
import Controls from './Controls';

const App = () => {
  const API_KEY = process.env.AIRTABLE_API_KEY || window.ENV.AIRTABLE_API_KEY;
  const [params, setParams] = useState({
    digital: 50,
    handmade: 50,
    clean: 50,
    complex: 50,
    serious: 50,
    playful: 50
  });
  const [currentStyle, setCurrentStyle] = useState({
    name: '',
    titleFont: '',
    bodyFont: '',
    primaryColor: '',
    secondaryColor: '',
    tertiaryColor: ''
  });

  const Airtable = require('airtable');
  let base;
  let allStyles = [];

  const configAirtable = () => {
    console.log('configuring airtable');
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: API_KEY
    });
    base = Airtable.base('app4XYxF3LslU9cVh');
    base('styles')
      .select({
        view: 'Grid view'
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            if (record !== undefined) {
              allStyles.push(record);
            }
          });
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          matchParams();
        }
      );
  };

  const getRandomInt = (max, min) => {
    const _max = max - 1;
    return Math.floor(Math.random() * (_max - min) + min);
  };

  const matchParams = () => {
    let matches = [];
    for (let i in allStyles) {
      if (allStyles[i].fields !== undefined) {
        const data = allStyles[i].fields;
        if (params.digital > 50 && data.digital > 50) {
          matches.push(allStyles[i]);
        }
        if (params.handmade > 50 && data.handmade > 50) {
          matches.push(allStyles[i]);
        }
        matches.push(allStyles[i]);
        if (params.clean > 50 && data.clean > 50) {
        }
        if (params.complex > 50 && data.complex > 50) {
          matches.push(allStyles[i]);
        }
        if (params.serious > 50 && data.serious > 50) {
          matches.push(allStyles[i]);
        }
        if (params.playful > 50 && data.playful > 50) {
          matches.push(allStyles[i]);
        }
      }
    }
    const random = getRandomInt(matches.length, 0);
    const selected = matches[random].fields;
    console.log(selected);
    setCurrentStyle({
      ...currentStyle,
      name: selected.name,
      titleFont: selected.primary,
      bodyFont: selected.secondary,
      primaryColor: selected.palette[0],
      secondaryColor: selected.palette[1],
      tertiaryColor: selected.palette[2]
    });
  };

  useEffect(() => {
    window.addEventListener('paramsUpdated', e => {
      setParams({ ...params, [e.detail.id]: e.detail.value });
      matchParams();
    });
    return () =>
      window.removeEventListener('paramsUpdated', e => {
        setParams({ ...params, [e.detail.id]: e.detail.value });
      });
  }, [params]);

  useEffect(() => {
    configAirtable();
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%'
      }}
    >
      {currentStyle.titleFont && (
        <Fragment>
          <Content
            name={currentStyle.name}
            titleFont={currentStyle.titleFont}
            bodyFont={currentStyle.bodyFont}
            primary={currentStyle.primaryColor}
            secondary={currentStyle.secondaryColor}
            tertiary={currentStyle.tertiaryColor}
          />
          <Controls params={params}></Controls>
        </Fragment>
      )}
    </div>
  );
};

export default App;
