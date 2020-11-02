import Swal from 'sweetalert2';
const GET_USERS_ADMINISTRATOR = 'GET_USERS_ADMINISTRATOR';
const GET_USERS_AUTHENTICATION = 'GET_USER_AUTHENTICATION';
const LOGOUT = 'LOGOUT';
// ----------- || --- || Authentication || --- || ------------ //

// --- login In BackOffice --- //
const fetchPostLogin = (form, history) => async (dispatch) => {
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/auth/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.status === 201) {
            Swal.fire({
                title: 'Berhasil Login!',
                text: '',
                icon: 'success',
            });
            localStorage.setItem('user', JSON.stringify(result));

            history.push('/dashboard');
        } else if (response.status === 401) {
            localStorage.clear();
        } else {
            Swal.fire({
                title: 'Wrong email!',
                text: 'Email atau kata sandi anda tidak valid',
                icon: 'error',
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Email atau Password Salah!',
            text: '',
            icon: 'error',
        });
    }
};

// --- Get Who Iam --- //
const getUsersAuthentication = (data) => {
    return {
        type: GET_USERS_AUTHENTICATION,
        data,
    };
};

// --- fetch Get User Authentication --- //
const fetchGetUsersAuthentication = () => async (dispatch) => {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/auth/me`;
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    dispatch(getUsersAuthentication(result));
};

// ----------- || --- || Users Administrator || --- || ------------ //

// --- Add Administrator for SuperAdmin --- //
const fetchPostAdministrator = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/users`;
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        await response.json();

        if (response.status === 201) {
            Swal.fire({
                title: 'Succes Add Administrator!',
                text: '',
                icon: 'success',
            });
            history.push('/users');
        } else {
            Swal.fire({
                title: 'Email Yang di buat tidak sesuai atau sudah terdaftar',
                text: '',
                icon: 'error',
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Email ini sudah terdaftar',
            text: '',
            icon: 'error',
        });
    }
};

// --- Get User Administrator --- //
const getUsersAdministrator = (data) => {
    return {
        type: GET_USERS_ADMINISTRATOR,
        data,
    };
};

// --- fetch Get User Administrator --- //
const fetchGetUsersAdministrator = () => async (dispatch) => {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/users`;
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    dispatch(getUsersAdministrator(result));
};

// --- Update Administrator - Method PUT ---- //
const fetchUpdateAdministrator = (form, id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/users/${id}`;

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
            window.location.reload('/dashboard');
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

// --- DELETE ADMINISTRATOR METHOD DELETE --- //
const fetchDeleteAdministrator = (id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/users/${id}`;
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
        window.location.reload('/dashboard');
    } else {
        Swal.fire({
            title: 'Delete gagal',
            text: '',
            icon: 'error',
        });
    }
};

// --- Multiple Delete --- //
const fetchMultipleDeleteUsers = (form) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/users/delete/multiple`;
    const options = {
        method: 'DELETE',
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
            title: 'Delete Berhasil!',
            text: '',
            icon: 'success',
        });
        window.location.reload('/topic');
    } else {
        Swal.fire({
            title: 'Delete gagal',
            text: '',
            icon: 'error',
        });
    }
};

// --- logout --- //
const logout = (history) => (dispatch, getState) => {
    Swal.fire({
        icon: 'success',
        title: 'Terima Kasih',
    });
    localStorage.clear();
    history.push('/');
    dispatch({ type: LOGOUT });
};
export {
    fetchPostLogin,
    fetchPostAdministrator,
    fetchGetUsersAdministrator,
    fetchGetUsersAuthentication,
    fetchUpdateAdministrator,
    fetchDeleteAdministrator,
    fetchMultipleDeleteUsers,
    getUsersAdministrator,
    getUsersAuthentication,
    GET_USERS_ADMINISTRATOR,
    GET_USERS_AUTHENTICATION,
    LOGOUT,
    logout,
};
