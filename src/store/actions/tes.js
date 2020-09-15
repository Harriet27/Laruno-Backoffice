const GET_ORDER = 'GET_ORDER';

const getOrder = (data) => {
    return {
        type: GET_ORDER,
        data,
    };
};

const fetchPostTesting = (form) => async () => {
    try {
        const url = `https://5f1b22af610bde0016fd35ad.mockapi.io/users`;
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.status === 200 || 201) {
            alert('post succes');
        } else {
            alert('gagal post');
        }
    } catch (error) {
        console.log(error);
    }
};

export { fetchPostTesting, getOrder, GET_ORDER };
