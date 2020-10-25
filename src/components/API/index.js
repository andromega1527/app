import React, { Component } from 'react';
// import axios from 'axios';
import { create } from 'apisauce';

const api = create({
    baseURL: 'https://eonet.sci.gsfc.nasa.gov/api/v3/'
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;