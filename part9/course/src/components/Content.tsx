import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'

const Content: React.FC<{courseParts : CoursePart[]}> = ( { courseParts } ) => (
      <div>
      {courseParts.map(p => 
            <div key = {p.name}>
              <Part CoursePart={p} />
            </div>
        )}
      </div>
  );

export default Content;