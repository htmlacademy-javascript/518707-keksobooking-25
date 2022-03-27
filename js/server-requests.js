const GET_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_ADDRESS).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }).
    then((json) => onSuccess(json))
    .catch((err) => onError(err.message));
};

const postData = (onSuccess, onError, data) => {
  fetch(
    POST_DATA_ADDRESS,
    {
      method: 'POST',
      body: data,
    }).
    then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    }).catch(() => {
      onError();
    });
};

export {getData, postData};
