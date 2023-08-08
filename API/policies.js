/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const deletePolicy = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/policies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

const createPolicy = async (payload) => {
  try {
    const { data } = await axios.post(`${endpoint}/policies`, payload);
    return data.id;
  } catch (e) {
    console.warn(e);
    return 'call failed';
  }
};

const getPolicies = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/policies?user_id=${userId}`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSinglePolicy = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/policies/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) // will resolve a single object
      .catch(reject);
  });

const updatePolicy = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/policies/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(resolve)
      .catch(reject);
  });

export { createPolicy, deletePolicy, getPolicies, getSinglePolicy, updatePolicy };
