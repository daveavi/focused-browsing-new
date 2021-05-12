import Vue from 'vue';

import Card from '../components/Card.vue';

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Card)
});