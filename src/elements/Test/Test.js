import { DateRangePicker } from 'react-date-range';
import React, { Component } from 'react';
import { useState } from 'react';
// export default class MyComponent extends Component {
//   handleSelect(ranges) {
//     console.log(ranges);
//     // {
//     //   selection: {
//     //     startDate: [native Date Object],
//     //     endDate: [native Date Object],
//     //   }
//     // }
//   }
//   render() {
//     const selectionRange = {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     };
//     return (
//       <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
//     );
//   }
//

const CalenderRange = () => {
  const [state, setState] = useState({
    ranges: null,
  });
  console.log(state);
  const handleSelect = (ranges) => {
    console.log(ranges);
    setState({
      ranges,
    });
  };
  const handleClick = () => {
    console.log(state.ranges);
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };
  return (
    <>
      <DateRangePicker
        onInit={handleSelect}
        onChange={handleSelect}
        ranges={[selectionRange]}
        // moveRangeOnFirstSelection
      />
      <button onClick={handleClick}>Apply Dates</button>
    </>
  );
};

export default CalenderRange;
