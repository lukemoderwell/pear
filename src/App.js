import React, { useEffect, useLayoutEffect, useState } from 'react';
import Content from './Content';

const App = () => {
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const [styleId, setStyleId] = useState(0);
  const [allStyles, setList] = useState([]);
  const [currentStyle, setStyles] = useState({
    titleFont: '',
    bodyFont: '',
    primaryColor: '',
    secondaryColor: '',
    tertiaryColor: ''
  });

  const Airtable = require('airtable');
  let base;

  const configAirtable = () => {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: API_KEY
    });
    base = Airtable.base('app4XYxF3LslU9cVh');
  };

  const getSetStyles = id => {
    base('styles')
      .find(id)
      .then(record => {
        let _styles = { ...currentStyle };
        const primaryFont = base('fonts')
          .find(record.fields.primary[0])
          .then(res => {
            return (_styles.titleFont = res.fields.name);
          });

        const secondaryFont = base('fonts')
          .find(record.fields.secondary[0])
          .then(res => {
            return (_styles.bodyFont = res.fields.name);
          });

        const primaryColor = base('colors')
          .find(record.fields.palette[0])
          .then(res => {
            return (_styles.primaryColor = res.fields.id);
          });

        const secondaryColor = base('colors')
          .find(record.fields.palette[1])
          .then(res => {
            return (_styles.secondaryColor = res.fields.id);
          });

        const tertiaryColor = base('colors')
          .find(record.fields.palette[2])
          .then(res => {
            return (_styles.tertiaryColor = res.fields.id);
          })
          .catch(err => {
            console.log(err);
          });

        return Promise.all([
          primaryFont,
          secondaryFont,
          primaryColor,
          secondaryColor,
          tertiaryColor
        ]).then(() => {
          setStyles({ ..._styles });
        });
      })
      .catch(err => {
        console.error(err);
        return;
      });
  };

  useEffect(() => {
    configAirtable();
    base('styles')
      .select({
        view: 'Grid view'
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            setList(allStyles.push(record));
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
          getSetStyles(allStyles[styleId].id);
        }
      );
  }, []);

  // useLayoutEffect(() => {
  //   getSetStyles(allStyles[styleId].id);
  // }, [styleId]);

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div>
        <input
          type="number"
          value={styleId}
          onChange={event => setStyleId(event.target.value)}
        />
      </div>
      {currentStyle.titleFont && (
        <Content
          titleFont={currentStyle.titleFont}
          bodyFont={currentStyle.bodyFont}
          primary={currentStyle.primaryColor}
          secondary={currentStyle.secondaryColor}
          tertiary={currentStyle.tertiaryColor}
        />
      )}
    </div>
  );
};

export default App;
