import React from 'react';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';

const Entries:
    React.FC<{ entries: Array<Entry> | undefined }>
        = ({ entries }) => {

    if (!entries || !entries.length) return <p>no entries...</p>;


    return(
        <>
        {
          entries.map((e, i) =>
            <div key={i+1000}>
              <EntryDetails entry={e} />
            </div>
          )
        }
        </>
    );
};

export default Entries;
