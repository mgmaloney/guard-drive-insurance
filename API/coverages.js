import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createCoverage = async (policyId, payload) => {
  try {
    const response = await axios.post(`${dbUrl}/policies/${policyId}/addcoverage`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'failed call';
  }
};

const deleteCoverage = async (policyId, payload) => {
  try {
    const response = await axios.delete(`${dbUrl}/policies/${policyId}/deletecoverage`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'failed call';
  }
};

const updateCoverage = async (policyId, payload) => {
  try {
    const response = await axios.put(`${dbUrl}/policies/${policyId}/updatecoverage`, payload);
    return response;
  } catch (e) {
    console.warn(e);
    return 'failed call';
  }
};

const getAllCoverages = async () => {
  try {
    const { data } = await axios.get(`${dbUrl}/coverages`);
    console.warn(data);
    return Object.values(data);
  } catch (e) {
    console.warn(e);
    return 'failed call';
  }
};

export {
  createCoverage, deleteCoverage, updateCoverage, getAllCoverages,
};
