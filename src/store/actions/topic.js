const GET_TOPIC = "GET_TOPIC";

// --- Get Topic --- //
const getTopic = (data) => {
    return {
        type: GET_TOPIC,
        data,
    };
};

const fetchGetTopic = () => async (dispatch) => {
    const url = `http://139.162.59.84:7000/api/v1/topics`;
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    dispatch(getTopic(result));
};

export { getTopic, GET_TOPIC, fetchGetTopic };
