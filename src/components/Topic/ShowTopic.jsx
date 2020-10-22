//  --- Testing Show Topic --- //

// import React, { useState, useEffect } from 'react';
// import Card from '../../elements/Card/Card';
// import ModalSmart from '../../elements/Modal/ModalSmart';
// import { fetchShowTopic } from '../../store/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import Styled from 'styled-components';
// // import { useHistory } from 'react-router-dom';
// // --- Styled Components --- //
// const Section = Styled.section`
//     width: 100%;

//     align-items: center;
//     display: flex;
//     justify-content: center;

// `;

// // --- Styled Components --- //

// export default function ShowTopic(props) {
//     const dispatch = useDispatch();
//     const topic = useSelector((state) => state.detailtopic);

//     // --- useEffect --- get data topic ---//
//     useEffect(() => {
//         dispatch(fetchShowTopic(props.id));
//     }, [dispatch]);

//     return (
//         <React.Fragment>
//             <ModalSmart buttonLabel="show" title="Show Topic">
//                 <Section>
//                     <h1>Apakah kamu yakin ingin menghapus Topic ini ?</h1>
//                 </Section>
//             </ModalSmart>
//         </React.Fragment>
//     );
// }
