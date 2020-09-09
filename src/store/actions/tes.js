const GET_ORDER = "GET_ORDER";

const getOrder = (data) => {
    return {
        type: GET_ORDER,
        data,
    };
};

const fetchGetOrder = () => async (dispatch) => {
    try {
        const url = `${process.env.URI_LIVE}/product`;
        const options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();

        dispatch(getOrder(result.data));
    } catch (error) {
        console.log(error);
    }
};

export { fetchGetOrder, getOrder, GET_ORDER };
