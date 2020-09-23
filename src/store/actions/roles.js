import Swal from 'sweetalert2';
const GET_ROLES = 'GET_ROLES';
// const FIND_PRODUCT = 'FIND_PRODUCT';
// const SHOW_ROLES = 'SHOW_ROLES';

// --- Post Product --- //

const fetchPostRoles = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/roles`;

    const options = {
        body: JSON.stringify(form),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    await response.json();

    if (response.status === 201) {
        Swal.fire({
            title: 'Add Succes!',
            text: '',
            icon: 'success',
        });

        history.push('/');
    }
};

// --- Get Roles --- //
const getRoles = (data) => {
    return {
        type: GET_ROLES,
        data,
    };
};

const fetchGetRoles = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/roles`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(getRoles(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Find Product, Method GET, Search --- //

// const findRoles = (data) => {
//     return {
//         type: FIND_PRODUCT,
//         data,
//     };
// };

// const fetchFindProduct = () => async (dispatch) => {
//     const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
//     try {
//         const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/find`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         const response = await fetch(url, options);
//         const result = await response.json();
//         dispatch(findProduct(result));
//     } catch (error) {
//         console.log(error);
//     }
// };

// --- DELETE ROLES METHOD DELETE --- //
const fetchDeleteRoles = (id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/roles/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    await response.json();

    if (response.status === 200) {
        Swal.fire({
            title: 'Delete Berhasil!',
            text: '',
            icon: 'success',
        });
        window.location.reload('/roles');
    } else {
        Swal.fire({
            title: 'Delete gagal',
            text: '',
            icon: 'error',
        });
    }
};

//  ---  Show Product Method Get --- //
// const showProduct = (data) => {
//     return {
//         type: SHOW_PRODUCT,
//         data,
//     };
// };

// const fetchShowProduct = (id) => async (dispatch) => {
//     const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
//     const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/${id}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await fetch(url, options);
//     const result = await response.json();
//     dispatch(showProduct(result));
// };

// --- Update Roles --- Method PUT ---- //
const fetchUpdateRoles = (form, id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/roles/${id}`;

        // --- apabila form itu kosong maka hapus formnya --- //
        for (let key in form) {
            if (form[key] === '') {
                delete form[key];
            }
        }
        // --- penting nih --- //

        const options = {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        await response.json();

        if (response.status === 200) {
            Swal.fire({
                title: 'Update Berhasil!',
                text: '',
                icon: 'success',
            });
            window.location.reload('/product');
        } else {
            Swal.fire({
                title: 'update gagal',
                text: '',
                icon: 'error',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    fetchPostRoles,
    fetchGetRoles,
    // fetchFindProduct,
    getRoles,
    // findProduct,
    GET_ROLES,
    // FIND_PRODUCT,
    // SHOW_PRODUCT,
    fetchDeleteRoles,
    // fetchShowProduct,
    // showProduct,
    fetchUpdateRoles,
};
