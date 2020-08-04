import React from 'react';
import { Entry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';
import CSS from 'csstype';

const Entries:
    React.FC<{ entries: Array<Entry> | undefined }>
        = ({ entries }) => {

    if (!entries || !entries.length) return <p>no entries...</p>;

    const codes = (codes: Array<string>|undefined) => {
        if (codes) return <DiagnosisCodes codes={codes} />;
        else return null;
    };

    const paragraphPadding: CSS.Properties = {
        padding: "10px"
    };

    return(
        <>
        {
            entries.map((e, i) =>
            <div key={i}>
                <p style={paragraphPadding}>
                    date: {e.date} <br></br>
                    description: {e.description}
                </p>
                {codes(e.diagnosisCodes)}
            </div>
            )
        }
        </>
    );
};

export default Entries;
