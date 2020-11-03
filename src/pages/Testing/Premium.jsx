// import React, { Component } from 'react';

// import MultiSelect from '@khanacademy/react-multi-select';
// // import Checkbox from 'material-ui/Checkbox';
// // import Chip from 'material-ui/Chip';

// const options = [
//     { value: 1, label: 'Brian Genisio' },
//     { value: 2, label: 'John Doe' },
//     { value: 3, label: 'Jane Doe' },
//     { value: 4, label: 'Zach Morris' },
//     { value: 5, label: 'Kelly Kapowski' },
//     { value: 6, label: 'A.C. Slater' },
//     { value: 7, label: 'Lisa Turtle' },
//     { value: 8, label: 'Jessie Spano' },
//     { value: 9, label: 'Samuel Powers' },
// ];

// const styles = {
//     chip: {
//         margin: 2,
//         marginRight: 4,
//     },
//     wrapper: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         maxHeight: '100%',
//     },
// };

// export default class Premium extends Component {
//     state = {
//         selectedOptions: [],
//     };

//     handleSelectedChanged = (selectedOptions) =>
//         this.setState({ selectedOptions });

//     handleUnselectItem = (removedVal) => () =>
//         this.setState({
//             selectedOptions: this.state.selectedOptions.filter(
//                 (option) => option !== removedVal
//             ),
//         });

//     renderOption = ({ checked, option, onClick }) => (
//         <checkbox label={option.label} onCheck={onClick} checked={checked} />
//     );

//     renderSelected = (selected, options) => {
//         if (!options.length) {
//             return <span>No users available</span>;
//         }

//         if (!selected.length) {
//             return <span>Select users ({options.length} available)</span>;
//         }

//         if (selected.length === options.length) {
//             return <span>All users</span>;
//         }

//         if (selected.length > 3) {
//             return <span>Selected {selected.length} users</span>;
//         }

//         return (
//             <div style={styles.wrapper}>
//                 {selected.map((value) => (
//                     <chip
//                         key={value}
//                         style={styles.chip}
//                         onRequestDelete={this.handleUnselectItem(value)}
//                     >
//                         {options.find((o) => value === o.value).label}
//                     </chip>
//                 ))}
//             </div>
//         );
//     };

//     render() {
//         const { selectedOptions } = this.state;

//         return (
//             <MultiSelect
//                 options={options}
//                 selected={selectedOptions}
//                 ItemRenderer={this.renderOption}
//                 valueRenderer={this.renderSelected}
//                 onSelectedChanged={this.handleSelectedChanged}
//             />
//         );
//     }
// }
