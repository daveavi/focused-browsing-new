import Vue from 'vue';

import Panel from '../../../components/TwitterCards/Panel/Panel-Dark.vue'

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Panel)
});