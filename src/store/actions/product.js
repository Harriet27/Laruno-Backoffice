import Swal from 'sweetalert2';

// --- Post Product --- //
const fetchPostProducts = (form, history) => async () => {
  const url = `http://139.162.59.84:7000/api/v1/products`;
  const token = JSON.parse(localStorage.getItem('user')).accessToken;
  console.log(token);
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
// --- Post Product --- //

export { fetchPostProducts };
