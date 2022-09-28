import axios from 'axios';
import React from 'react';

export class UserService {
  constructor(token) {
    this.token = token;
    this.baseUrl =
      'https://faraflix.herokuapp.com/users';
    this.header = {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  addFavoriteMovie(
    payload,
    successCallback,
    errorCallback
  ) {
    const { Username, movieId } = payload;
    const url = `${this.baseUrl}/${Username}/${movieId}`;

    axios
      .post(url, {}, this.header)
      .then(successCallback)
      .catch(errorCallback);
  }

  removeFavoriteMovie(
    payload,
    successCallback,
    errorCallback
  ) {
    const { Username, movieId } = payload;
    const url = `${this.baseUrl}/${Username}/${movieId}`;
    axios
      .delete(url, this.header)
      .then(successCallback)
      .catch(errorCallback);
  }

  getAllUsers(payload, successCallback, errorCallback) {
    const url = `${this.baseUrl}`;
    axios
      .get(url, this.header)
      .then(successCallback)
      .catch(errorCallback);
  }

  getOneUser(payload, successCallback, errorCallback) {
    const { user } = payload;
    const url = `${this.baseUrl}/${user}`;

    axios
      .get(url, this.header)
      .then(successCallback)
      .catch(errorCallback);
  }
}
