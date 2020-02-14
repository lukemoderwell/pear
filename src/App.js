import React, { useEffect, useState } from 'react';
import Content from './Content';

const App = () => {
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const [list, setList] = useState([]);
  const [styles, setStyles] = useState({
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
        let _styles = { ...styles };
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
            setList(list.push(record));
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
          getSetStyles(list[4].id);
        }
      );
  }, []);

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      {styles.titleFont && (
        <Content
          titleFont={styles.titleFont}
          bodyFont={styles.bodyFont}
          primary={styles.primaryColor}
          secondary={styles.secondaryColor}
          tertiary={styles.tertiaryColor}
        />
      )}
    </div>
  );
};

export default App;
