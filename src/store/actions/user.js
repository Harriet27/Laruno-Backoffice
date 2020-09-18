import Swal from 'sweetalert2';

// login In BackOffice
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
            history.push('/products');
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

// --- Add Administrator for SuperAdmin --- //
const fetchPostAdministrator = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/auth/login`;
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
            history.push('/dashboard');
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
export { fetchPostLogin, fetchPostAdministrator };
