const fetchPostLogin = (form, history) => async (dispatch) => {
    try {
        const url = `http://139.162.59.84:7000/api/v1/users/login`;
        const options = {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (response.status === 201) {
            alert(`mantul bro berhasil login`);
            localStorage.setItem("user", result);
            history.push("/products");
        } else if (response.status === 401) {
            localStorage.clear();
        }
    } catch (error) {
        alert(`masih eror`);
    }
};
export { fetchPostLogin };
