import Vue from 'vue';

import Panel from '../../../components/TwitterCards/Panel/Panel-Light.vue'

const app = new Vue({
    el: '#app',
    render: createElement => createElement(Panel)
});